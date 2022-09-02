package com.example.mopcon_android.network.model.more.speaker


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Tag(
    @Json(name = "color")
    val color: Color?,
    @Json(name = "name")
    val name: String?
) : Parcelable