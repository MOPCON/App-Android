package com.example.mopcon_android.network.model.more.sponsor


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Logo(
    @Json(name = "mobile")
    val mobile: String,
    @Json(name = "web")
    val web: String
): Parcelable