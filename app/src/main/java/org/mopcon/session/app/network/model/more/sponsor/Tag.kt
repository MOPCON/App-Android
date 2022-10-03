package org.mopcon.session.app.network.model.more.sponsor


import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@JsonClass(generateAdapter = true)
@Parcelize
data class Tag(
    @Json(name = "color")
    val color: String?,
    @Json(name = "name")
    val name: String?
) : Parcelable