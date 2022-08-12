package com.example.mopcon_android.network.model.home


import com.squareup.moshi.Json

data class Data(
    @Json(name = "banner")
    val banner: List<Banner>,
    @Json(name = "news")
    val news: List<NewsItem>
)

