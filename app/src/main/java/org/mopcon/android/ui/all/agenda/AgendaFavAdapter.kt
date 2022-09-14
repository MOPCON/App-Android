package org.mopcon.android.ui.all.agenda

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.android.databinding.*
import org.mopcon.android.db.AgendaFavData
import org.mopcon.android.db.DataConverter
import org.mopcon.android.ui.all.home.NoFavClickListener
import org.mopcon.android.util.getDeviceLanguage
import com.google.android.flexbox.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class AgendaFavAdapter(
    private val itemClickListener: FavItemClickListener,
    private val favItemClickListener: AddFavItemClickListener,
    private val noFavClickListener: NoFavClickListener,
) : ListAdapter<DataItem, RecyclerView.ViewHolder>(DiffCallback()) {
    enum class ItemType {
        FAV_ITEM, NO_FAV_ITEM
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(favList: List<AgendaFavData>? = listOf(), scrollToTop: () -> Unit) {
        adapterScope.launch {
            val items = when {
                favList.isNullOrEmpty() -> listOf(DataItem.NoFavItem)
                else -> favList.map { DataItem.FavItem(it) }
            }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(items) {
                    scrollToTop.invoke()
                }
            }
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.FAV_ITEM.ordinal -> FavItemViewHolder.from(parent)
            ItemType.NO_FAV_ITEM.ordinal -> NoFavItemViewHolder.from(parent)
            else -> NoFavItemViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is FavItemViewHolder -> {
                val data = getItem(position) as DataItem.FavItem
                holder.bind(data.favItem, itemClickListener, favItemClickListener)
            }

            is NoFavItemViewHolder -> {
                holder.bind(noFavClickListener)
            }

        }
    }

    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is DataItem.FavItem -> ItemType.FAV_ITEM.ordinal
            is DataItem.NoFavItem -> ItemType.NO_FAV_ITEM.ordinal
            else -> ItemType.NO_FAV_ITEM.ordinal
        }

    }

    class FavTitleViewHolder private constructor(private val binding: ItemHomeFavTitleBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(title: String) {
            binding.tvTitle.text = title
        }

        companion object {
            fun from(parent: ViewGroup) = FavTitleViewHolder(ItemHomeFavTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class FavItemViewHolder private constructor(private val binding: ItemHomeAgendaBinding) : // 原 ItemHomeAgendaBinding, 可刪
        RecyclerView.ViewHolder(binding.root) {

        private val tagAdapter by lazy { TagAdapter() }

        fun bind(data: AgendaFavData, itemClickListener: FavItemClickListener, favItemClickListener: AddFavItemClickListener) {
            binding.apply {

                root.setOnClickListener {
                    data.sessionId ?: return@setOnClickListener
                    itemClickListener.onClick(data)
                }

                //TODO : do we need star in HomePage fav items?
//                cbStar.isChecked = favSessionIdList.contains(data.sessionId)
                cbStar.setOnCheckedChangeListener { _, isChecked ->
                    cbStar.isChecked = isChecked
                    if (position >= 0) favItemClickListener.onClick(isChecked, data)
                }

                tvTime.text = data.time
                tvContent.text = getDeviceLanguage(
                    isEnglish = { data.topicE },
                    isOtherLanguage = { data.topic }
                )

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { data.namesE },
                    isOtherLanguage = { data.names }
                )

                tvLocation.text = data.location

                rvTag.apply {
                    adapter = tagAdapter
                    val flexboxLayoutManager = FlexboxLayoutManager(this.context).apply {
                        flexWrap = FlexWrap.WRAP
                        flexDirection = FlexDirection.ROW
                        alignItems = AlignItems.STRETCH
                        justifyContent = JustifyContent.FLEX_START
                    }
                    layoutManager = flexboxLayoutManager
                }

                val tagList = DataConverter.toTagList(data.tags)
                tagAdapter.submitList(tagList)
            }
        }

        companion object {
            fun from(parent: ViewGroup) = FavItemViewHolder(ItemHomeAgendaBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class NoFavItemViewHolder private constructor(private val binding: ItemHomeNoStoreBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(noFavClickListener: NoFavClickListener) {
            binding.tvGoAgenda.setOnClickListener {
                noFavClickListener.onClick()
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NoFavItemViewHolder(ItemHomeNoStoreBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }

    class DiffCallback : DiffUtil.ItemCallback<DataItem>() {
        override fun areItemsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class FavItemClickListener(val clickListener: (data: AgendaFavData) -> Unit) {
    fun onClick(data: AgendaFavData) = clickListener(data)
}

class AddFavItemClickListener(val clickListener: (isChecked: Boolean, agendaFavData: AgendaFavData) -> Unit) {
    fun onClick(isChecked: Boolean, agendaFavData: AgendaFavData) = clickListener(isChecked, agendaFavData)
}

sealed class DataItem {

    abstract val id: Int?

    data class FavItem(val favItem: AgendaFavData) : DataItem() {
        override val id = favItem.sessionId
    }

    object NoFavItem : DataItem() {
        override val id: Int? = null
    }

}
