package com.example.mopcon_android.ui.all.more.sponsor

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.more.sponsor.SponsorData
import com.example.mopcon_android.network.model.more.sponsor.SponsorDetailData
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.setGlideImg
import com.example.mopcon_android.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


class SponsorAdapter(private val itemClickListener: SponsorItemClickListener) : ListAdapter<SponsorDataItem, RecyclerView.ViewHolder>(DiffCallback()) {

    enum class ItemType {
        SPONSOR_TITLE, SPONSOR_CONTENT
    }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(sponsorList: List<SponsorData>? = listOf()) {
        adapterScope.launch {
            val contentList = mutableListOf<SponsorDataItem>()

            sponsorList?.map {
                contentList.add(SponsorDataItem.SponsorTitle(it))
                it.sponsorDetailData?.map { detail ->
                    contentList.add(SponsorDataItem.SponsorContent(detail))
                }
            }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList)
            }
        }
    }


    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is SponsorDataItem.SponsorTitle -> ItemType.SPONSOR_TITLE.ordinal
            is SponsorDataItem.SponsorContent -> ItemType.SPONSOR_CONTENT.ordinal
            else -> ItemType.SPONSOR_TITLE.ordinal
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.SPONSOR_TITLE.ordinal -> SponsorTitleViewHolder.from(parent)
            ItemType.SPONSOR_CONTENT.ordinal -> SponsorContentViewHolder.from(parent)
            else -> SponsorTitleViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is SponsorTitleViewHolder -> {
                val data = getItem(position) as SponsorDataItem.SponsorTitle
                holder.bind(data.sponsorData)
            }

            is SponsorContentViewHolder -> {
                val data = getItem(position) as SponsorDataItem.SponsorContent
                holder.bind(data.sponsorDetailData, itemClickListener)
            }

        }
    }

    class SponsorTitleViewHolder private constructor(private val binding: ItemSponsorTitleBinding) : RecyclerView.ViewHolder(binding.root) {

        private val imageMap = mapOf(
            "宇宙級" to R.drawable.img_sponsor01,
            "銀河級" to R.drawable.img_sponsor02,
            "行星級" to R.drawable.img_sponsor03,
            "彗星級" to R.drawable.img_sponsor04,
            "教育贊助" to R.drawable.img_sponsor05,
            "特別感謝" to R.drawable.img_sponsor06,
        )

        fun bind(sponsorData: SponsorData) {
            binding.apply {
                tvSponsorTitle.text = "${sponsorData.name} ${sponsorData.nameE}"
                ivIcon.setGlideImg(imageMap[sponsorData.name])
            }
        }

        companion object {
            fun from(parent: ViewGroup) = SponsorTitleViewHolder(ItemSponsorTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class SponsorContentViewHolder private constructor(private val binding: ItemSponsorContentBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(detailData: SponsorDetailData, itemClickListener: SponsorItemClickListener) {
            binding.apply {
                ivSponsor.setGlideImg(detailData.logoPath?.mobile)
                tvSponsor.text = getDeviceLanguage(
                    isEnglish = { if (detailData.nameE.isNullOrEmpty()) detailData.name else detailData.nameE  },
                    isOtherLanguage = { detailData.name }
                )
                itemView.setOnClickListener {
                    itemClickListener.onClick(detailData)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = SponsorContentViewHolder(ItemSponsorContentBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }


    class DiffCallback : DiffUtil.ItemCallback<SponsorDataItem>() {
        override fun areItemsTheSame(oldItem: SponsorDataItem, newItem: SponsorDataItem): Boolean {
            return oldItem.sponsorId == newItem.sponsorId
        }

        override fun areContentsTheSame(oldItem: SponsorDataItem, newItem: SponsorDataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class SponsorItemClickListener(val clickListener: (data: SponsorDetailData) -> Unit) {
    fun onClick(data: SponsorDetailData) = clickListener(data)
}


sealed class SponsorDataItem {

    abstract val sponsorId: Int?

    data class SponsorTitle(val sponsorData: SponsorData) : SponsorDataItem() {
        override val sponsorId: Int? = null
    }

    data class SponsorContent(val sponsorDetailData: SponsorDetailData) : SponsorDataItem() {
        override val sponsorId: Int = sponsorDetailData.sponsorId
    }

}