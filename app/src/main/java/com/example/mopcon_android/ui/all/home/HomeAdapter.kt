package com.example.mopcon_android.ui.all.home

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.bumptech.glide.request.RequestOptions
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.*
import com.example.mopcon_android.network.model.home.Banner
import com.example.mopcon_android.network.model.home.NewsItem
import com.example.mopcon_android.util.setTimeFormat
import com.example.mopcon_android.util.dpToPx
import com.stx.xhb.androidx.transformers.Transformer
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


data class Fav(val id: Int, val test: String) //TODO: rewrite

class HomeAdapter(private val bannerClickListener: BannerClickListener, private val itemClickListener: NewsItemClickListener) : ListAdapter<DataItem, RecyclerView.ViewHolder>(DiffCallback()) {
    enum class ItemType {
        BANNER, NEWS_TITLE, NEWS_ITEM, FAV_TITLE, FAV_ITEM, NO_FAV_ITEM
    }

    private var bannerList = listOf<Banner>()
    private var newsList = listOf<NewsItem>()

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(bannerList: List<Banner>, newsList: List<NewsItem>, favList: List<Fav>?) {
        this.bannerList = bannerList
        this.newsList = newsList
        adapterScope.launch {
            val items: List<DataItem> = listOf(DataItem.Banner) +
                    when {
                        newsList.isNullOrEmpty() -> listOf()
                        else -> listOf(DataItem.LatestNewsTitle) + newsList.map { DataItem.LatestNewsItem(it) }
                    } +
                    listOf(DataItem.FavTitle) +
                    when {
                        favList.isNullOrEmpty() -> listOf(DataItem.NoFavItem)
                        else -> favList.map { DataItem.FavItem(it) }
                    }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(items)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            ItemType.BANNER.ordinal -> BannerViewHolder.from(parent)
            ItemType.NEWS_TITLE.ordinal -> NewsTitleViewHolder.from(parent)
            ItemType.NEWS_ITEM.ordinal -> NewsItemViewHolder.from(parent)
            ItemType.FAV_TITLE.ordinal -> FavTitleViewHolder.from(parent)
            ItemType.FAV_ITEM.ordinal -> FavItemViewHolder.from(parent)
            ItemType.NO_FAV_ITEM.ordinal -> NoFavItemViewHolder.from(parent)
            else -> NoFavItemViewHolder.from(parent)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        when (holder) {

            is BannerViewHolder -> {
                holder.bind(bannerList, bannerClickListener)
            }

            is NewsTitleViewHolder -> {
                holder.bind(holder.itemView.context.getString(R.string.latest_news))
            }

            is NewsItemViewHolder -> {
                val data = getItem(position) as DataItem.LatestNewsItem
                val isLastItem = position == (listOf(DataItem.Banner) + listOf(DataItem.LatestNewsTitle) + newsList.map { DataItem.LatestNewsItem(it) }).size - 1
                holder.bind(isLastItem, data.newsItem, itemClickListener)
            }

            is FavTitleViewHolder -> {
                holder.bind(holder.itemView.context.getString(R.string.your_favorite_flight_is_arriving))
            }

            is FavItemViewHolder -> {
                val data = getItem(position) as DataItem.FavItem
                holder.bind(data.favItem)
            }

            is NoFavItemViewHolder -> {
                holder.bind() //TODO: added listener
            }

        }
    }

    override fun getItemViewType(position: Int): Int {
        return when (getItem(position)) {
            is DataItem.Banner -> ItemType.BANNER.ordinal
            is DataItem.LatestNewsTitle -> ItemType.NEWS_TITLE.ordinal
            is DataItem.LatestNewsItem -> ItemType.NEWS_ITEM.ordinal
            is DataItem.FavTitle -> ItemType.FAV_TITLE.ordinal
            is DataItem.FavItem -> ItemType.FAV_ITEM.ordinal
            is DataItem.NoFavItem -> ItemType.NO_FAV_ITEM.ordinal
            else -> ItemType.NO_FAV_ITEM.ordinal
        }

    }

    class NewsTitleViewHolder private constructor(private val binding: ItemHomeTitleBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(title: String) {
            binding.tvTitle.text = title
        }

        companion object {
            fun from(parent: ViewGroup) = NewsTitleViewHolder(ItemHomeTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class FavTitleViewHolder private constructor(private val binding: ItemHomeTitleBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(title: String) {
            binding.tvTitle.text = title
        }

        companion object {
            fun from(parent: ViewGroup) = FavTitleViewHolder(ItemHomeTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class FavItemViewHolder private constructor(private val binding: ItemHomeAgendaBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: Fav) {
            binding.tvContent.text = item.test
        }

        companion object {
            fun from(parent: ViewGroup) = FavItemViewHolder(ItemHomeAgendaBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class BannerViewHolder private constructor(private val binding: ItemHomeBannerBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(bannerList: List<Banner>, bannerClickListener: BannerClickListener) {
            setBanner(bannerList, bannerClickListener)
        }

        companion object {
            fun from(parent: ViewGroup) = BannerViewHolder(ItemHomeBannerBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

        private fun setBanner(bannerList: List<Banner>, bannerClickListener: BannerClickListener) {
            binding.banner.apply {
                setOnItemClickListener { _, _, _, position ->
                    val url = bannerList[position].link
                    if (url.isEmpty()) return@setOnItemClickListener
                    bannerClickListener.onClick(url)
                }

                val requestOptions = RequestOptions()
                    .transform(CenterCrop(), RoundedCorners(8))
                    .placeholder(R.drawable.home_banner)
                    .error(R.drawable.home_banner)
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .dontTransform()

                loadImage { _, _, view, position ->
                    try {
                        Glide.with(this)
                            .load(bannerList[position].img)
                            .apply(requestOptions)
                            .into(view as ImageView)
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }

                setPageTransformer(Transformer.Scale)
                setAutoPlayAble(bannerList.count() > 1)
                setBannerData(bannerList)
            }
        }
    }

    class NoFavItemViewHolder private constructor(private val binding: ItemHomeNoStoreBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind() {}

        companion object {
            fun from(parent: ViewGroup) = NoFavItemViewHolder(ItemHomeNoStoreBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }

    class NewsItemViewHolder private constructor(private val binding: ItemNewsMoreBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(isLastItem: Boolean, item: NewsItem, itemClickListener: NewsItemClickListener) {
            binding.apply {
                if (!isLastItem) {
                    val params = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
                    params.setMargins(0, 0, 0, 16.dpToPx())
                    itemView.layoutParams = params
                }
                tvDate.setTimeFormat(item.date)
                tvTitle.text = item.title
                tvContent.text = item.description
                itemView.setOnClickListener {
                    itemClickListener.onClick(item.link)
                }
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NewsItemViewHolder(ItemNewsMoreBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }


    class DiffCallback : DiffUtil.ItemCallback<DataItem>() {
        override fun areItemsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: DataItem, newItem: DataItem): Boolean {
            return oldItem == newItem
        }

    }
}

class BannerClickListener(val clickListener: (link: String) -> Unit) {
    fun onClick(link: String) = clickListener(link)
}

class NewsItemClickListener(val clickListener: (link: String) -> Unit) {
    fun onClick(link: String) = clickListener(link)
}


sealed class DataItem {

    abstract val id: Int?

    object Banner : DataItem() {
        override val id: Int? = null
    }

    object LatestNewsTitle : DataItem() {
        override val id: Int? = null
    }

    data class LatestNewsItem(val newsItem: NewsItem) : DataItem() {
        override val id = newsItem.id
    }

    object FavTitle : DataItem() {
        override val id: Int? = null
    }

    data class FavItem(val favItem: Fav) : DataItem() {
        override val id = favItem.id
    }

    object NoFavItem : DataItem() {
        override val id: Int? = null
    }

}
