package com.example.mopcon_android.network.community_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class CommunityDetailResponse(
    @Json(name = "data")
    val `data`: CommunityDetailData,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
) : Parcelable