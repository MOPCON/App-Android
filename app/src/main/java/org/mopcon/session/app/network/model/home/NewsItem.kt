package org.mopcon.session.app.network.model.home

import com.squareup.moshi.Json

data class NewsItem(
    @Json(name = "id")
    val id: Int,
    @Json(name = "date")
    val date: Long,
    @Json(name = "title")
    val title: String,
    @Json(name = "description")
    val description: String,
    @Json(name = "link")
    val link: String
)
