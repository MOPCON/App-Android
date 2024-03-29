package org.mopcon.session.app.ui.all.more.sponsor.detail

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.session.app.databinding.*
import org.mopcon.session.app.network.model.more.sponsor.SpeakerInfoData
import org.mopcon.session.app.network.model.more.sponsor.SponsorDetailData
import org.mopcon.session.app.ui.all.agenda.TagAdapter
import com.google.android.flexbox.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.mopcon.session.app.util.*


class SponsorDetailAdapter(private val itemClickListener: SponsorDetailItemClickListener, private val favClickListener: FavClickListener) : ListAdapter<SponsorDataItem, RecyclerView.ViewHolder>(DiffCallback()) {

    enum class ItemType {
        SPONSOR_INFO, SPEAKER_AGENDA
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    private var hasSpeakerInfo: Boolean = false

    fun addFooterAndSubmitList(storedList: List<Int>, sponsorDetailData: SponsorDetailData?) {
        adapterScope.launch {
            if (sponsorDetailData == null) return@launch

            hasSpeakerInfo = sponsorDetailData.speakerInformation?.isNullOrEmpty() == false

            val contentList = mutableListOf<SponsorDataItem>()
            contentList.add(SponsorDataItem.SponsorInfo(sponsorDetailData))

            sponsorDetailData.speakerInformation?.map {
                it.isChecked = storedList.contains(it.sessionId)
                contentList.add(SponsorDataItem.SpeakerAgenda(it))
            }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList)
            }
        }
    }


    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is SponsorDataItem.SponsorInfo -> ItemType.SPONSOR_INFO.ordinal
            is SponsorDataItem.SpeakerAgenda -> ItemType.SPEAKER_AGENDA.ordinal
            else -> ItemType.SPONSOR_INFO.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.SPONSOR_INFO.ordinal -> SponsorTitleViewHolder.from(parent)
            ItemType.SPEAKER_AGENDA.ordinal -> SponsorContentViewHolder.from(parent)
            else -> SponsorTitleViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is SponsorTitleViewHolder -> {
                val data = getItem(position) as SponsorDataItem.SponsorInfo
                holder.bind(data.sponsorDetailData, hasSpeakerInfo)
            }

            is SponsorContentViewHolder -> {
                val data = getItem(position) as SponsorDataItem.SpeakerAgenda
                holder.bind(data.speakerInfoData, itemClickListener, favClickListener)
            }

        }
    }

    class SponsorTitleViewHolder private constructor(private val binding: ItemSponsorDetailHeaderBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(detailData: SponsorDetailData, hasSpeakerInfo: Boolean) {
            binding.apply {
                layoutSponsor.apply {
                    tvTitle.isVisible = hasSpeakerInfo
                    ivSponsor.setGlideImg(detailData.logoPath?.mobile)
                    tvSponsor.isVisible = !(detailData.name.isEmpty() && detailData.nameE.isNullOrEmpty())
                    tvSponsor.text = getDeviceLanguage(
                        isEnglish = { if (detailData.nameE.isNullOrEmpty()) detailData.name else detailData.nameE },
                        isOtherLanguage = { detailData.name }
                    )

                    //  sponsor 只有web跟fb, https://ksda.slack.com/archives/C036RJ3121K/p1662148703368049
                    mediaBar.apply {
                        setOnClickOpenWeb(detailData.officialWebsite, detailData.facebookUrl, null, null, null, null)
                        setItemVisibility(
                            detailData.officialWebsite?.isNotEmpty() == true,
                            detailData.facebookUrl?.isNotEmpty() == true,
                            showIg = false,
                            showLinkedIn = false,
                            showGit = false,
                            showTwitter = false,
                        )
                    }
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = SponsorTitleViewHolder(ItemSponsorDetailHeaderBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class SponsorContentViewHolder private constructor(private val binding: ItemAgendaContentBinding) : RecyclerView.ViewHolder(binding.root) {

        private val tagAdapter by lazy { TagAdapter() }

        fun bind(speakerInfoData: SpeakerInfoData, itemClickListener: SponsorDetailItemClickListener, favClickListener: FavClickListener) {
            binding.apply {

                cbStar.isChecked = speakerInfoData.isChecked

                cbStar.setOnClickListener {
                    favClickListener.onClick(cbStar.isChecked, speakerInfoData)
                }

                val startTime = if (speakerInfoData.startedAt?.toString().isNullOrEmpty()) "" else "${speakerInfoData.startedAt?.toTimeFormat(MD_FORMAT)} ${speakerInfoData.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (speakerInfoData.endedAt?.toString().isNullOrEmpty()) "" else " - ${speakerInfoData.endedAt?.toTimeFormat(HM_FORMAT)}"
                tvTime.text = "$startTime$endTimeStr"
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (speakerInfoData.topicNameE.isNullOrEmpty()) speakerInfoData.topicName else speakerInfoData.topicNameE },
                    isOtherLanguage = { speakerInfoData.topicName }
                )

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { speakerInfoData.nameE ?: speakerInfoData.name ?: "" },
                    isOtherLanguage = { speakerInfoData.name ?: "" }
                )

                tvLocation.text = speakerInfoData.room

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

                tagAdapter.submitList(speakerInfoData.tags)

                root.setOnClickListener {
                    itemClickListener.onClick(speakerInfoData)
                }

            }

        }

        companion object {
            fun from(parent: ViewGroup) = SponsorContentViewHolder(ItemAgendaContentBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }


    class DiffCallback : DiffUtil.ItemCallback<SponsorDataItem>() {
        override fun areItemsTheSame(oldItem: SponsorDataItem, newItem: SponsorDataItem): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: SponsorDataItem, newItem: SponsorDataItem): Boolean {
            return (oldItem.isChecked == newItem.isChecked) && (oldItem.sponsorId == newItem.sponsorId) && (oldItem.speakerId == newItem.speakerId)
        }

    }
}

class SponsorDetailItemClickListener(val clickListener: (data: SpeakerInfoData) -> Unit) {
    fun onClick(data: SpeakerInfoData) = clickListener(data)
}

class FavClickListener(val clickListener: (isChecked: Boolean, data: SpeakerInfoData) -> Unit) {
    fun onClick(isChecked: Boolean, data: SpeakerInfoData) = clickListener(isChecked, data)
}

sealed class SponsorDataItem {

    abstract val sponsorId: Int?
    abstract val speakerId: Int?
    abstract val isChecked: Boolean?

    data class SponsorInfo(val sponsorDetailData: SponsorDetailData) : SponsorDataItem() {
        override val sponsorId: Int = sponsorDetailData.sponsorId
        override val speakerId: Int? = null
        override val isChecked: Boolean? = null
    }

    data class SpeakerAgenda(val speakerInfoData: SpeakerInfoData) : SponsorDataItem() {
        override val sponsorId: Int? = null
        override val speakerId: Int? = speakerInfoData.speakerId
        override val isChecked = speakerInfoData.isChecked
    }


}