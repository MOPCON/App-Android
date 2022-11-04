package org.mopcon.session.app.ui.all.more.speaker

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.session.app.databinding.*
import org.mopcon.session.app.network.model.more.speaker.SpeakerData
import org.mopcon.session.app.ui.all.agenda.TagAdapter
import org.mopcon.session.app.util.Constants
import org.mopcon.session.app.util.getDeviceLanguage
import com.google.android.flexbox.*
import org.mopcon.session.app.util.Constants.MOPCON_API_URL
import org.mopcon.session.app.util.setGlideImg


class SpeakerAdapter(private val itemClickListener: SpeakerItemClickListener) : ListAdapter<SpeakerData, SpeakerAdapter.SpeakerItemViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SpeakerItemViewHolder {
        return SpeakerItemViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: SpeakerItemViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data, itemClickListener)
    }

    class SpeakerItemViewHolder private constructor(private val binding: ItemSpeakerBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val tagAdapter by lazy { TagAdapter() }

        fun bind(item: SpeakerData, itemClickListener: SpeakerItemClickListener) {
            binding.apply {
                ivIcon.setGlideImg("${MOPCON_API_URL}${item.img?.mobile}")
                tvSpeaker.text = item.name

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { if (item.nameE.isNullOrEmpty()) item.name else item.nameE  },
                    isOtherLanguage = { item.name }
                )

                tvJobTitle.text = getDeviceLanguage(
                    isEnglish = { if (item.jobTitleE.isNullOrEmpty()) item.jobTitle else item.jobTitleE  },
                    isOtherLanguage = { item.name }
                )

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

                tagAdapter.submitList(item.tags)

                itemView.setOnClickListener {
                    itemClickListener.onClick(item)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = SpeakerItemViewHolder(ItemSpeakerBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }


    class DiffCallback : DiffUtil.ItemCallback<SpeakerData>() {
        override fun areItemsTheSame(oldItem: SpeakerData, newItem: SpeakerData): Boolean {
            return oldItem.speakerId == newItem.speakerId
        }

        override fun areContentsTheSame(oldItem: SpeakerData, newItem: SpeakerData): Boolean {
            return oldItem == newItem
        }

    }
}

class SpeakerItemClickListener(val clickListener: (data: SpeakerData) -> Unit) {
    fun onClick(data: SpeakerData) = clickListener(data)
}
