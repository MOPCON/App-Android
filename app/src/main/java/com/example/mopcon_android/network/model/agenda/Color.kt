package com.example.mopcon_android.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Color(
    @Json(name = "mobile")
    val mobile: String,
    @Json(name = "web")
    val web: String
): Parcelable