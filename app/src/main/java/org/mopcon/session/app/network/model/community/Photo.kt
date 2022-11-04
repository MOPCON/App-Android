package org.mopcon.session.app.network.model.community


import android.os.Parcelable
import com.squareup.moshi.Json
import kotlinx.parcelize.Parcelize

@Parcelize
data class Photo(
    @Json(name = "mobile")
    val mobile: String? = null,
    @Json(name = "web")
    val web: String? = null
) : Parcelable