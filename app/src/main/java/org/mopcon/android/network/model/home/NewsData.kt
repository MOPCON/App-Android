package org.mopcon.android.network.model.home


import com.squareup.moshi.Json

data class NewsData(
    @Json(name = "date")
    val date: Int,
    @Json(name = "description")
    val description: String,
    @Json(name = "id")
    val id: String,
    @Json(name = "link")
    val link: String,
    @Json(name = "title")
    val title: String
)