package com.example.mopcon_android.ui.all.agenda

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.agenda.Tag

class TagAdapter : ListAdapter<Tag, TagAdapter.TagViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TagViewHolder {
        return TagViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: TagViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data)
    }

    class TagViewHolder private constructor(private val binding: ItemTagBinding) : RecyclerView.ViewHolder(binding.root) {

        fun bind(tag: Tag) {
            binding.tvTag.text = tag.name
//            binding.tvTag.background.setTint(Color.parseColor(tag.color.mobile))
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
