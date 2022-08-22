package com.example.mopcon_android.network.model.agenda


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Tag(
    @Json(name = "color")
    val color: Color,
    @Json(name = "name")
    val name: String
): Parcelable