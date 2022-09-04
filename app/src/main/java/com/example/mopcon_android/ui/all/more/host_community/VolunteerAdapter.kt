package com.example.mopcon_android.ui.all.more.host_community

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.community.CommunityData
import com.example.mopcon_android.network.model.more.speaker.SpeakerData
import com.example.mopcon_android.network.model.more.sponsor.SponsorData
import com.example.mopcon_android.network.model.volunteer.VolunteerData
import com.example.mopcon_android.ui.all.agenda.TagAdapter
import com.example.mopcon_android.ui.all.more.sponsor.SponsorAdapter
import com.example.mopcon_android.ui.all.more.sponsor.SponsorDataItem
import com.example.mopcon_android.util.Constants
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.setGlideImg
import com.google.android.flexbox.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


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