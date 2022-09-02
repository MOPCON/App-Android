package com.example.mopcon_android.network.model.volunteer


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Volunteer(
    @Json(name = "id")
    val id: String?,
    @Json(name = "introduction_e")
    val introductionE: String?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "photo")
    val photo: String?
) : Parcelable