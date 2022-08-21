package com.example.mopcon_android.ui.all.agenda

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.databinding.*

class TagAdapter : ListAdapter<String, TagAdapter.TagViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TagViewHolder {
        return TagViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: TagViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data)
    }

    class TagViewHolder private constructor(private val binding: ItemTagBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(tagStr: String) {
            binding.tvTag.text = tagStr
        }

        companion object {
            fun from(parent: ViewGroup) = TagViewHolder(ItemTagBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class DiffCallback : DiffUtil.ItemCallback<String>() {
        override fun areItemsTheSame(oldItem: String, newItem: String): Boolean {
            return oldItem == newItem
        }

        override fun areContentsTheSame(oldItem: String, newItem: String): Boolean {
            return oldItem == newItem
        }

    }
}
