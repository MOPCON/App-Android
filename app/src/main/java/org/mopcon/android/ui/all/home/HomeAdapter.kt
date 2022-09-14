package org.mopcon.android.ui.all.home

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.bumptech.glide.request.RequestOptions
import org.mopcon.android.databinding.*
import org.mopcon.android.db.AgendaFavData
import org.mopcon.android.db.DataConverter
import org.mopcon.android.network.model.home.Banner
import org.mopcon.android.network.model.home.NewsItem
import org.mopcon.android.ui.all.agenda.TagAdapter
import org.mopcon.android.util.getDeviceLanguage
import org.mopcon.android.R
import com.google.android.flexbox.*
import com.stx.xhb.androidx.transformers.Transformer
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class HomeAdapter(
    private val bannerClickListener: BannerClickListener,
    private val newsMoreClickListener: NewsMoreClickListener,
    private val itemClickListener: NewsItemClickListener,
    private val favItemClickListener: FavItemClickListener,
    private val addToFavClickListener: AddToFavClickListener,
    private val noFavClickListener: NoFavClickListener,
) : ListAdapter<DataItem, RecyclerView.ViewHolder>(DiffCallback()) {
    enum class ItemType {
        BANNER, NEWS_TITLE, NEWS_ITEM, FAV_TITLE, FAV_ITEM, NO_FAV_ITEM
    }

    private var bannerList = listOf<Banner>()
    private var newsList = listOf<NewsItem>()
    private var favList = listOf<AgendaFavData>()

//    var favSessionIdList = listOf<Int>()
//        set(value) {
//            field = value
//            notifyDataSetChanged()
//        }

    private val adapterScope = CoroutineScope(Dispatchers.Default)

    fun addFooterAndSubmitList(bannerList: List<Banner>? = listOf(), newsList: List<NewsItem>? = listOf(), favList: List<AgendaFavData>? = listOf(), scrollToTop: () -> Unit) {
        this.bannerList = bannerList ?: listOf()
        this.newsList = newsList ?: listOf()
        this.favList = favList ?: listOf()
        adapterScope.launch {
            val items: List<DataItem> = listOf(DataItem.Banner) +
                    when {
                        newsList.isNullOrEmpty() -> listOf()
                        else -> listOf(DataItem.LatestNewsTitle) + listOf(DataItem.LatestNewsItem)
                    } +
                    listOf(DataItem.FavTitle) +
                    when {
                        favList.isNullOrEmpty() -> listOf(DataItem.NoFavItem)
                        else -> favList.map { DataItem.FavItem(it) }
                    }

            withContext(Dispatchers.Main) { //update in main ui thread
                submitList(items) {
                    scrollToTop.invoke()
                }
            }
        }
    }

    fun addFooterAndSubmitList(favList: List<AgendaFavData>? = listOf()) {
        adapterScope.launch {
            val items: List<DataItem> = listOf(DataItem.Banner) +
                    when {
                        newsList.isNullOrEmpty() -> listOf()
                        else -> listOf(DataItem.LatestNewsTitle) + listOf(DataItem.LatestNewsItem)
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
                holder.bind(holder.itemView.context.getString(R.string.latest_news), newsMoreClickListener)
            }

            is NewsItemViewHolder -> {
                holder.bind(newsList, itemClickListener)
            }

            is FavTitleViewHolder -> {
                holder.bind(holder.itemView.context.getString(R.string.your_favorite_flight_is_arriving))
            }

            is FavItemViewHolder -> {
                val data = getItem(position) as DataItem.FavItem
                holder.bind(data.favItem, favItemClickListener, addToFavClickListener)
            }

            is NoFavItemViewHolder -> {
                holder.bind(noFavClickListener)
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

    class NewsTitleViewHolder private constructor(private val binding: ItemHomeNewsTitleBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(title: String, newsMoreClickListener: NewsMoreClickListener) {
            binding.tvTitle.text = title
            binding.tvMore.setOnClickListener {
                newsMoreClickListener.onClick()
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NewsTitleViewHolder(ItemHomeNewsTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class FavTitleViewHolder private constructor(private val binding: ItemHomeFavTitleBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(title: String) {
            binding.tvTitle.text = title
        }

        companion object {
            fun from(parent: ViewGroup) = FavTitleViewHolder(ItemHomeFavTitleBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }

    }

    class FavItemViewHolder private constructor(private val binding: ItemHomeAgendaBinding) : // 原 ItemHomeAgendaBinding, 可刪
        RecyclerView.ViewHolder(binding.root) {

        private val tagAdapter by lazy { TagAdapter() }

        fun bind(data: AgendaFavData, favItemClickListener: FavItemClickListener, addToFavClickListener: AddToFavClickListener) {
            binding.apply {

                root.setOnClickListener {
                    data.sessionId ?: return@setOnClickListener
                    favItemClickListener.onClick(data)
                }
                //TODO : do we need star in HomePage fav items?
//                cbStar.isChecked = favSessionIdList.contains(data.sessionId)
//                cbStar.setOnCheckedChangeListener { _, isChecked ->
//                    cbStar.isChecked = isChecked
//                    if (position >= 0) addToFavClickListener.onClick(isChecked, bindingAdapterPosition , data)
//                }

                tvTime.text = data.time
                tvContent.text = getDeviceLanguage(
                    isEnglish = { data.topicE },
                    isOtherLanguage = { data.topic }
                )

                tvSpeaker.text = getDeviceLanguage(
                    isEnglish = { data.namesE },
                    isOtherLanguage = { data.names }
                )

                tvLocation.text = data.location

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

                val tagList = DataConverter.toTagList(data.tags)
                tagAdapter.submitList(tagList)
            }
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
                    .placeholder(R.drawable.home_banner)
                    .error(R.drawable.home_banner)
                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .dontTransform()

                loadImage { _, _, view, position ->
                    try {

                        val imgV = view.rootView.findViewById<ImageView>(R.id.img)

                        Glide.with(this)
                            .load(bannerList[position].img)
                            .apply(requestOptions)
                            .into(imgV)
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }

                setIsClipChildrenMode(true)
                setPageTransformer(Transformer.Default)
                setAutoPlayAble(true)
                setBannerData(R.layout.item_home_banner_img, bannerList)
            }
        }
    }

    class NoFavItemViewHolder private constructor(private val binding: ItemHomeNoStoreBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(noFavClickListener: NoFavClickListener) {
            binding.tvGoAgenda.setOnClickListener {
                noFavClickListener.onClick()
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NoFavItemViewHolder(ItemHomeNoStoreBinding.inflate(LayoutInflater.from(parent.context), parent, false))
        }
    }

    class NewsItemViewHolder private constructor(private val binding: ItemNewsRvBinding) :
        RecyclerView.ViewHolder(binding.root) {


        fun bind(newsList: List<NewsItem>, itemClickListener: NewsItemClickListener) {
            binding.apply {
                val newsAdapter = HomeNewsAdapter.newInstance(itemClickListener)
                rvNews.apply {
                    adapter = newsAdapter
                    layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
                }
                newsAdapter.submitList(newsList)
            }
        }

        companion object {
            fun from(parent: ViewGroup) = NewsItemViewHolder(ItemNewsRvBinding.inflate(LayoutInflater.from(parent.context), parent, false))
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

class NewsMoreClickListener(val clickListener: () -> Unit) {
    fun onClick() = clickListener()
}

class NewsItemClickListener(val clickListener: (link: String) -> Unit) {
    fun onClick(link: String) = clickListener(link)
}

class FavItemClickListener(val clickListener: (agendaFavData: AgendaFavData) -> Unit) {
    fun onClick(agendaFavData: AgendaFavData) = clickListener(agendaFavData)
}

class AddToFavClickListener(val clickListener: (isChecked: Boolean, position: Int, agendaFavData: AgendaFavData) -> Unit) {
    fun onClick(isChecked: Boolean, position: Int, agendaFavData: AgendaFavData) = clickListener(isChecked, position, agendaFavData)
}

class NoFavClickListener(val clickListener: () -> Unit) {
    fun onClick() = clickListener()
}

sealed class DataItem {

    abstract val id: Int?

    object Banner : DataItem() {
        override val id: Int? = null
    }

    object LatestNewsTitle : DataItem() {
        override val id: Int? = null
    }

    object LatestNewsItem : DataItem() {
        override val id: Int? = null
    }

    object FavTitle : DataItem() {
        override val id: Int? = null
    }

    data class FavItem(val favItem: AgendaFavData) : DataItem() {
        override val id = favItem.sessionId
    }

    object NoFavItem : DataItem() {
        override val id: Int? = null
    }

}
