package org.mopcon.session.app.network.model.volunteer_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class VolunteerDetailData(
    @Json(name = "introduction")
    val introduction: String?,
    @Json(name = "introduction_e")
    val introductionE: String?,
    @Json(name = "members")
    val members: List<String>?,
    @Json(name = "name")
    val name: String?,
    @Json(name = "name_e")
    val nameE: String?,
    @Json(name = "photo")
    val photo: String?
) : Parcelable