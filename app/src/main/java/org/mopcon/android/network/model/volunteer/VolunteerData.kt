package org.mopcon.android.network.model.volunteer


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class VolunteerData(
    @Json(name = "id")
    val id: Int,
    @Json(name = "introduction_e")
    val introductionE: String?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "photo")
    val photo: String?
) : Parcelable