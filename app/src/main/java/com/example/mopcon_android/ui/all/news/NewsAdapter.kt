package com.example.mopcon_android.ui.all.news

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.news.NewsData
import com.example.mopcon_android.util.setTimeFormat


class NewsAdapter(private val itemClickListener: NewsItemClickListener) : ListAdapter<NewsData, NewsAdapter.NewsItemViewHolder>(DiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsItemViewHolder {
        return NewsItemViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: NewsItemViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data, itemClickListener)
    }

    class NewsItemViewHolder private constructor(private val binding: ItemNewsMoreBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(item: NewsData, itemClickListener: NewsItemClickListener) {
            binding.apply {
                tvDate.setTimeFormat(item.date)
                tvTitle.text = item.title
                tvContent.text = item.description
                itemView.setOnClickListener {
                    itemClickListener.onClick(item.link ?: "")
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NewsItemViewHolder(ItemNewsMoreBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }


    class DiffCallback : DiffUtil.ItemCallback<NewsData>() {
        override fun areItemsTheSame(oldItem: NewsData, newItem: NewsData): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: NewsData, newItem: NewsData): Boolean {
            return oldItem == newItem
        }

    }
}

class NewsItemClickListener(val clickListener: (link: String) -> Unit) {
    fun onClick(link: String) = clickListener(link)
}
