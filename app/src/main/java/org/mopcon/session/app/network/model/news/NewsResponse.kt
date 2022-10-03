package org.mopcon.session.app.network.model.news


import com.squareup.moshi.Json

data class NewsResponse(
    @Json(name = "data")
    val newsData: List<NewsData> ?= listOf(),
    @Json(name = "message")
    val message: String,
    @Json(name = "success")
    val success: Boolean
)