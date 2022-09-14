package org.mopcon.android.ui.all.more.host_community

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.android.databinding.*
import org.mopcon.android.network.model.volunteer.VolunteerData
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.mopcon.android.util.setGlideImg


class VolunteerAdapter(
    private val itemClickListener: VolunteerItemClickListener,
    private val footerClickListener: FooterClickListener
) : ListAdapter<VolunteerDataItem, RecyclerView.ViewHolder>(DiffCallback()) {

    enum class ItemType {
        VOLUNTEER, FOOTER
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(volunteerList: List<VolunteerData>) {
        adapterScope.launch {
            val contentList = mutableListOf<VolunteerDataItem>()

            volunteerList.map {
                contentList.add(VolunteerDataItem.Volunteer(it))
            }

            contentList.add(VolunteerDataItem.Footer)

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList)
            }
        }
    }

    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is VolunteerDataItem.Volunteer -> ItemType.VOLUNTEER.ordinal
            is VolunteerDataItem.Footer -> ItemType.FOOTER.ordinal
            else -> ItemType.VOLUNTEER.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.VOLUNTEER.ordinal -> VolunteerViewHolder.from(parent)
            ItemType.FOOTER.ordinal -> FooterViewHolder.from(parent)
            else -> VolunteerViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is VolunteerViewHolder -> {
                val data = getItem(position) as VolunteerDataItem.Volunteer
                holder.bind(data.volunteerData, itemClickListener)
            }

            is FooterViewHolder -> {
                holder.bind(footerClickListener)
            }

        }
    }

    class VolunteerViewHolder private constructor(private val binding: ItemVolunteerBinding) :
        RecyclerView.ViewHolder(binding.root) {


        fun bind(item: VolunteerData, itemClickListener: VolunteerItemClickListener) {
            binding.apply {
                ivAvatar.setGlideImg(item.photo)
                tvVolunteer.text = item.name

                itemView.setOnClickListener {
                    itemClickListener.onClick(item)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = VolunteerViewHolder(ItemVolunteerBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }


    class FooterViewHolder private constructor(private val binding: ItemVolunteerFooterBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(footerClickListener: FooterClickListener) {
            binding.apply {
                btnJoin.setOnClickListener {
                    footerClickListener.onClick()
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = FooterViewHolder(ItemVolunteerFooterBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }


    class DiffCallback : DiffUtil.ItemCallback<VolunteerDataItem>() {
        override fun areItemsTheSame(oldItem: VolunteerDataItem, newItem: VolunteerDataItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: VolunteerDataItem, newItem: VolunteerDataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class VolunteerItemClickListener(val clickListener: (data: VolunteerData) -> Unit) {
    fun onClick(data: VolunteerData) = clickListener(data)
}

class FooterClickListener(val clickListener: () -> Unit) {
    fun onClick() = clickListener()
}

sealed class VolunteerDataItem {
    abstract val id: Int?

    object Footer : VolunteerDataItem() {
        override val id: Int? = null
    }

    data class Volunteer(val volunteerData: VolunteerData) : VolunteerDataItem() {
        override val id: Int = volunteerData.id
    }


}