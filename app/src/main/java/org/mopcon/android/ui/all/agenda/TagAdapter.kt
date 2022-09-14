package org.mopcon.android.ui.all.agenda

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.android.databinding.*
import org.mopcon.android.network.model.agenda.ColorData
import org.mopcon.android.network.model.agenda.Tag
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class TagAdapter : ListAdapter<Tag, TagAdapter.TagViewHolder>(DiffCallback()) {

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(tagList: List<Tag>? = listOf(), isRecordable: Boolean?= true) {
        adapterScope.launch {
            val contentList = mutableListOf<Tag>()

            if (isRecordable == false) contentList.add(Tag(ColorData("#FF7987", ""),"禁止攝影"))

            tagList?.map {  contentList.add(it) }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(contentList)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TagViewHolder {
        return TagViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: TagViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data)
    }

    class TagViewHolder private constructor(private val binding: ItemTagBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(tag: Tag) {
            //api傳禁止攝影顯示粉色，其他顏色則按照設計稿
            if (tag.name == "禁止攝影") binding.tvTag.background.setTint(Color.parseColor(tag.color.mobile))
            binding.tvTag.text = tag.name
        }

        companion object {
            fun from(parent: ViewGroup) = TagViewHolder(ItemTagBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class DiffCallback : DiffUtil.ItemCallback<Tag>() {
        override fun areItemsTheSame(oldItem: Tag, newItem: Tag): Boolean {
            return oldItem.name == newItem.name
        }

        override fun areContentsTheSame(oldItem: Tag, newItem: Tag): Boolean {
            return oldItem == newItem
        }

    }
}
