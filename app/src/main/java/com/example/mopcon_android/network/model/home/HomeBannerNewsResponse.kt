package com.example.mopcon_android.network.model.home


import com.squareup.moshi.Json

data class HomeBannerNewsResponse(
    @Json(name = "data")
    val data: HomeBannerNewsData,
    @Json(name = "message")
    val message: String,
    @Json(name = "success")
    val success: Boolean
)