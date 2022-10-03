package org.mopcon.session.app.ui.all.more.host_community

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.session.app.databinding.*
import org.mopcon.session.app.util.getDeviceLanguage
import org.mopcon.session.app.R
import org.mopcon.session.app.network.model.community.CommunityData
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.mopcon.session.app.util.setGlideImg


class CommunityAdapter(
    private val communityItemClickListener: CommunityItemClickListener
) : ListAdapter<CommunityDataItem, RecyclerView.ViewHolder>(DiffCallback()) {

    enum class ItemType {
        COMMUNITY_TITLE, PARTICIPANT_TITLE, COMMUNITY, PARTICIPANT
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(
        communityList: List<CommunityData>? = listOf(),
        participantData: List<CommunityData>? = listOf()
    ) {
        adapterScope.launch {
            val contentList = mutableListOf<CommunityDataItem>()

            if (communityList?.isNotEmpty() == true) contentList.add(CommunityDataItem.CommunityTitle)
            communityList?.map {
                contentList.add(CommunityDataItem.Community(it))
            }

            if (participantData?.isNotEmpty() == true) contentList.add(CommunityDataItem.ParticipantTitle)
            participantData?.map {
                contentList.add(CommunityDataItem.Community(it))
//                contentList.add(CommunityDataItem.Participant(it))
            }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList)
            }
        }
    }


    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is CommunityDataItem.CommunityTitle -> ItemType.COMMUNITY_TITLE.ordinal
            is CommunityDataItem.ParticipantTitle -> ItemType.PARTICIPANT_TITLE.ordinal
            is CommunityDataItem.Community -> ItemType.COMMUNITY.ordinal
//            is CommunityDataItem.Participant -> ItemType.PARTICIPANT.ordinal
            else -> ItemType.PARTICIPANT.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.COMMUNITY_TITLE.ordinal -> CommunityTitleViewHolder.from(parent)
            ItemType.PARTICIPANT_TITLE.ordinal -> ParticipantTitleViewHolder.from(parent)
            ItemType.COMMUNITY.ordinal -> CommunityViewHolder.from(parent)
            ItemType.PARTICIPANT.ordinal -> CommunityViewHolder.from(parent)
//            ItemType.PARTICIPANT.ordinal -> ParticipantViewHolder.from(parent)
            else -> CommunityViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is CommunityTitleViewHolder -> {
                holder.bind()
            }
            is ParticipantTitleViewHolder -> {
                holder.bind()
            }

            is CommunityViewHolder -> {
                val data = getItem(position) as CommunityDataItem.Community
                holder.bind(data.communityData, communityItemClickListener)
            }
/*
            is ParticipantViewHolder -> {
                val data = getItem(position) as CommunityDataItem.Participant
                holder.bind(data.participantData, communityItemClickListener)
            }
*/

        }
    }

    class CommunityTitleViewHolder private constructor(private val binding: ItemSponsorTitleBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind() {
            binding.apply {
                tvSponsorTitle.text = itemView.context.getString(R.string.participant_community)
                ivIcon.setGlideImg(R.drawable.img_community01)
            }
        }

        companion object {
            fun from(parent: ViewGroup) = CommunityTitleViewHolder(ItemSponsorTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class ParticipantTitleViewHolder private constructor(private val binding: ItemSponsorTitleBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind() {
            binding.apply {
                tvSponsorTitle.text = itemView.context.getString(R.string.participant_community)
                ivIcon.setGlideImg(R.drawable.img_community02)
            }
        }

        companion object {
            fun from(parent: ViewGroup) = ParticipantTitleViewHolder(ItemSponsorTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class CommunityViewHolder private constructor(private val binding: ItemSponsorContentBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(communityData: CommunityData, itemClickListener: CommunityItemClickListener) {
            binding.apply {
//                Log.e(">>>", "communityData.photo = ${communityData.photo}")
                ivSponsor.setGlideImg(communityData.photo?.mobile)
                tvSponsor.text = getDeviceLanguage(
                    isEnglish = { if (communityData.nameE.isNullOrEmpty()) communityData.name else communityData.nameE },
                    isOtherLanguage = { communityData.name }
                )
                itemView.setOnClickListener {
                    itemClickListener.onClick(communityData)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = CommunityViewHolder(ItemSponsorContentBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }
/*
    class ParticipantViewHolder private constructor(private val binding: ItemSponsorContentBinding) :
        RecyclerView.ViewHolder(binding.root) {


        fun bind(participantData: CommunityData, itemClickListener: CommunityItemClickListener) {
            binding.apply {
                ivSponsor.setGlideImg(participantData.photo)
                tvSponsor.text = getDeviceLanguage(
                    isEnglish = { if (participantData.nameE.isNullOrEmpty()) participantData.name else participantData.nameE  },
                    isOtherLanguage = { participantData.name }
                )
                itemView.setOnClickListener {
                    itemClickListener.onClick(participantData)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = ParticipantViewHolder(ItemSponsorContentBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }
*/


    class DiffCallback : DiffUtil.ItemCallback<CommunityDataItem>() {
        override fun areItemsTheSame(oldItem: CommunityDataItem, newItem: CommunityDataItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: CommunityDataItem, newItem: CommunityDataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class CommunityItemClickListener(val clickListener: (data: CommunityData) -> Unit) {
    fun onClick(data: CommunityData) = clickListener(data)
}

sealed class CommunityDataItem {
    //TODO: should return Int from api
    abstract val id: Int?

    object CommunityTitle : CommunityDataItem() {
        override val id: Int? = null
    }

    object ParticipantTitle : CommunityDataItem() {
        override val id: Int? = null
    }

    data class Community(val communityData: CommunityData) : CommunityDataItem() {
        override val id: Int = communityData.id
    }
/*
    data class Participant(val participantData: CommunityData) : CommunityDataItem() {
        override val id: Int = participantData.id
    }
*/

}