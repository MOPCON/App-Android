package org.mopcon.session.app.network.model.community


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class CommunityData(
    @Json(name = "id")
    val id: Int,
    @Json(name = "name")
    val name: String,
    @Json(name = "nameE")
    val nameE: String?,
    @Json(name = "photo")
    val photo: Photo?,
) : Parcelable