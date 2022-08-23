package com.example.mopcon_android.network.model.news


import com.squareup.moshi.Json

data class NewsData(
    @Json(name = "date")
    val date: Long?,
    @Json(name = "description")
    val description: String? = null,
    @Json(name = "id")
    val id: String? = null,
    @Json(name = "link")
    val link: String? = null,
    @Json(name = "title")
    val title: String? = null
)