package com.example.mopcon_android.network.model.news


import com.squareup.moshi.Json

data class NewsResponse(
    @Json(name = "data")
    val data: List<NewsData>,
    @Json(name = "message")
    val message: String,
    @Json(name = "success")
    val success: Boolean
)