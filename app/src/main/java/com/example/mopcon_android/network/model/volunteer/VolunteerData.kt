package com.example.mopcon_android.network.model.volunteer


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class VolunteerData(
    @Json(name = "volunteer")
    val volunteer: List<Volunteer>?
) : Parcelable