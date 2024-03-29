package org.mopcon.session.app.network.model.home


import com.squareup.moshi.Json

data class HomeBannerNewsData(
    @Json(name = "banner")
    val banner: List<Banner>,
    @Json(name = "news")
    val news: List<NewsItem>
)

