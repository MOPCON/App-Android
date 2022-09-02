package com.example.mopcon_android.ui.all.more.speaker.detail

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.agenda.PeriodData
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.ui.all.agenda.TagAdapter
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.toTimeFormat
import com.google.android.flexbox.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


class SpeakersAgendaAdapter(private val itemClickListener: ItemClickListener) : ListAdapter<SpeakerDataItem, RecyclerView.ViewHolder>(DiffCallback()) {
    enum class ItemType {
        SPEAKER_INFO, SPEAKER_AGENDA
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(agendaList: List<PeriodData>? = listOf(), scrollToTop: () -> Unit) {
        adapterScope.launch {
            val contentList = mutableListOf<SpeakerDataItem>()

            agendaList?.map {
                if (it.room?.isNullOrEmpty() == true) {
                    contentList.add(SpeakerDataItem.AgendaTitle(it))
                } else {
                    it.room.map { room ->
                        contentList.add(SpeakerDataItem.AgendaContent(room))
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
            is SpeakerDataItem.AgendaTitle -> ItemType.SPEAKER_INFO.ordinal
            is SpeakerDataItem.AgendaContent -> ItemType.SPEAKER_AGENDA.ordinal
            else -> ItemType.SPEAKER_INFO.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.SPEAKER_INFO.ordinal -> AgendaTitleViewHolder.from(parent)
            ItemType.SPEAKER_AGENDA.ordinal -> AgendaContentViewHolder.from(parent)
            else -> AgendaTitleViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is AgendaTitleViewHolder -> {
                val data = getItem(position) as SpeakerDataItem.AgendaTitle
                holder.bind(data.agendaData)
            }

            is AgendaContentViewHolder -> {
                val data = getItem(position) as SpeakerDataItem.AgendaContent
                holder.bind(data.roomData, itemClickListener)
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

        fun bind(roomData: RoomData, itemClickListener: ItemClickListener) {
            binding.apply {
                viewDisableLayout.setOnClickListener { itemClickListener.onClick(roomData) }
                val startTime = if (roomData.startedAt?.toString().isNullOrEmpty()) "" else "${roomData.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (roomData.endedAt?.toString().isNullOrEmpty()) "" else " - ${roomData.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (roomData.topicE.isNullOrEmpty()) roomData.topic else roomData.topicE },
                    isOtherLanguage = { roomData.topic }
                )
                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { roomData.speakers.joinToString(", ") { if (it.nameE.isNullOrEmpty()) it.name else it.nameE } },
                    isOtherLanguage = { roomData.speakers.joinToString("、") { it.name } }
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


    class DiffCallback : DiffUtil.ItemCallback<SpeakerDataItem>() {
        override fun areItemsTheSame(oldItem: SpeakerDataItem, newItem: SpeakerDataItem): Boolean {
            return (oldItem.startTime == newItem.startTime) && (oldItem.topic == newItem.topic)
        }

        override fun areContentsTheSame(oldItem: SpeakerDataItem, newItem: SpeakerDataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class ItemClickListener(val clickListener: (data: RoomData) -> Unit) {
    fun onClick(data: RoomData) = clickListener(data)
}


sealed class SpeakerDataItem {

    abstract val startTime: Long?
    abstract val topic: String?

    data class AgendaTitle(val agendaData: PeriodData) : SpeakerDataItem() {
        override val startTime = agendaData.startedAt
        override val topic: String = ""
    }

    data class AgendaContent(val roomData: RoomData) : SpeakerDataItem() {
        override val startTime = roomData.startedAt
        override val topic: String = roomData.topic
    }


}
