package com.example.mopcon_android.network.model.agenda_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
data class Img(
    @Json(name = "mobile")
    val mobile: String?,
    @Json(name = "web")
    val web: String?
)