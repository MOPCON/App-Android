package org.mopcon.android.network.model.volunteer_detail


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class VolunteerDetailResponse(
    @Json(name = "data")
    val `data`: VolunteerDetailData,
    @Json(name = "message")
    val message: String?,
    @Json(name = "success")
    val success: Boolean?
) : Parcelable