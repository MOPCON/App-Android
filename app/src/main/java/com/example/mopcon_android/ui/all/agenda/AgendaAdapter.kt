package com.example.mopcon_android.ui.all.agenda

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.agenda.PeriodData
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.toTimeFormat
import com.google.android.flexbox.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import com.example.mopcon_android.R


class AgendaAdapter(private val itemClickListener: ItemClickListener, private val favClickListener: FavClickListener) : ListAdapter<AgendaDataItem, RecyclerView.ViewHolder>(DiffCallback()) {
    enum class ItemType {
        AGENDA_TITLE, AGENDA_CONTENT
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    private var isIconBlue = false

    //TODO: 優化
    var favSessionIdList = listOf<Int>()
        set(value) {
            field = value
            notifyDataSetChanged()
        }

    fun addFooterAndSubmitList(isIconBlue: Boolean, agendaList: List<PeriodData>? = listOf(), scrollToTop: () -> Unit) {
        this.isIconBlue = isIconBlue

        adapterScope.launch {
            val contentList = mutableListOf<AgendaDataItem>()

            agendaList?.map {
                if (it.room?.isNullOrEmpty() == true) {
                    contentList.add(AgendaDataItem.AgendaTitle(it))
                } else {
                    it.room.map { room ->
                        contentList.add(AgendaDataItem.AgendaContent(room))
                    }
                }
            }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList) {
                    scrollToTop.invoke()
                }
            }
        }
    }


    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is AgendaDataItem.AgendaTitle -> ItemType.AGENDA_TITLE.ordinal
            is AgendaDataItem.AgendaContent -> ItemType.AGENDA_CONTENT.ordinal
            else -> ItemType.AGENDA_TITLE.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.AGENDA_TITLE.ordinal -> AgendaTitleViewHolder.from(parent)
            ItemType.AGENDA_CONTENT.ordinal -> AgendaContentViewHolder.from(parent)
            else -> AgendaTitleViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is AgendaTitleViewHolder -> {
                val data = getItem(position) as AgendaDataItem.AgendaTitle
                holder.bind(data.agendaData)
            }

            is AgendaContentViewHolder -> {
                val data = getItem(position) as AgendaDataItem.AgendaContent
                holder.bind(isIconBlue, data.roomData, itemClickListener, favClickListener, favSessionIdList)
            }

        }
    }

    class AgendaTitleViewHolder private constructor(private val binding: ItemAgendaTitleBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(agendaData: PeriodData) {
            binding.tvTitle.text = agendaData.event
            val startTime = if (agendaData.startedAt?.toString().isNullOrEmpty()) "" else "${agendaData.startedAt?.toTimeFormat(HM_FORMAT)}"
            val endTimeStr = if (agendaData.endedAt?.toString().isNullOrEmpty()) "" else " - ${agendaData.endedAt?.toTimeFormat(HM_FORMAT)}"
            binding.tvTime.text = "$startTime$endTimeStr"
        }

        companion object {
            fun from(parent: ViewGroup) = AgendaTitleViewHolder(ItemAgendaTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class AgendaContentViewHolder private constructor(private val binding: ItemAgendaContentBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val tagAdapter by lazy { TagAdapter() }

        fun bind(isIconBlue: Boolean, roomData: RoomData, itemClickListener: ItemClickListener, favClickListener: FavClickListener, favSessionIdList: List<Int>) {
            binding.apply {
                root.setOnClickListener { itemClickListener.onClick(roomData) }

                val icon = if (isIconBlue) R.drawable.ic_battleship_blue else R.drawable.ic_battleship_pink
                ivIcon.setImageResource(icon)

                cbStar.isChecked = favSessionIdList.contains(roomData.sessionId)

                cbStar.setOnCheckedChangeListener { _, isChecked ->
                    favClickListener.onClick(isChecked, roomData)
                }

                val startTime = if (roomData.startedAt?.toString().isNullOrEmpty()) "" else "${roomData.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (roomData.endedAt?.toString().isNullOrEmpty()) "" else " - ${roomData.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (roomData.topicE.isNullOrEmpty()) roomData.topic ?: "" else roomData.topicE },
                    isOtherLanguage = { roomData.topic ?: "" }
                )

                val list = roomData.speakers ?: listOf()
                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { list.joinToString(", ") { if (it.nameE.isNullOrEmpty()) it.name?:"" else it.nameE } },
                    isOtherLanguage = { list.joinToString("、") { it.name?:"" } }
                )
                tvLocation.text = roomData.room

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

                tagAdapter.submitList(roomData.tags)
            }
        }

        companion object {
            fun from(parent: ViewGroup) = AgendaContentViewHolder(ItemAgendaContentBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }


    class DiffCallback : DiffUtil.ItemCallback<AgendaDataItem>() {
        override fun areItemsTheSame(oldItem: AgendaDataItem, newItem: AgendaDataItem): Boolean {
            return (oldItem.startTime == newItem.startTime) && (oldItem.topic == newItem.topic)
        }

        override fun areContentsTheSame(oldItem: AgendaDataItem, newItem: AgendaDataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class ItemClickListener(val clickListener: (data: RoomData) -> Unit) {
    fun onClick(data: RoomData) = clickListener(data)
}

class FavClickListener(val clickListener: (isChecked: Boolean, data: RoomData) -> Unit) {
    fun onClick(isChecked: Boolean, data: RoomData) = clickListener(isChecked, data)
}


sealed class AgendaDataItem {

    abstract val startTime: Long?
    abstract val topic: String?

    data class AgendaTitle(val agendaData: PeriodData) : AgendaDataItem() {
        override val startTime = agendaData.startedAt
        override val topic: String = ""
    }

    data class AgendaContent(val roomData: RoomData) : AgendaDataItem() {
        override val startTime = roomData.startedAt
        override val topic: String = roomData.topic ?: ""
    }

}
