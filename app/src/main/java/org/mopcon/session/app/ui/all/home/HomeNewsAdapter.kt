package org.mopcon.session.app.ui.all.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.session.app.databinding.ItemNewsBinding
import org.mopcon.session.app.network.model.home.NewsItem
import org.mopcon.session.app.util.setTimeFormat

class HomeNewsAdapter : ListAdapter<NewsItem, HomeNewsAdapter.NewsItemViewHolder>(DiffCallback()) {

    var itemClickListener: NewsItemClickListener? = null

    companion object {
        @JvmStatic
        fun newInstance(itemClickListener: NewsItemClickListener) = HomeNewsAdapter().apply {
            this.itemClickListener = itemClickListener
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsItemViewHolder {
        return NewsItemViewHolder.from(parent)
    }

    override fun onBindViewHolder(holder: NewsItemViewHolder, position: Int) {
        val data = getItem(position)
        holder.bind(data, itemClickListener)
    }

    class NewsItemViewHolder private constructor(private val binding: ItemNewsBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(item: NewsItem, itemClickListener: NewsItemClickListener?) {
            binding.apply {
                tvDate.setTimeFormat(item.date)
                tvTitle.text = item.title
                tvContent.text = item.description
                itemView.setOnClickListener {
                    itemClickListener?.onClick(item.link ?: "")
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NewsItemViewHolder(ItemNewsBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }


    class DiffCallback : DiffUtil.ItemCallback<NewsItem>() {
        override fun areItemsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
            return oldItem == newItem
        }

    }
}