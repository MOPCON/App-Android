package org.mopcon.session.app.ui.extension

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import org.mopcon.session.app.util.dpToPx

class RightItemDecoration(private val spaceSize: Int) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(outRect: Rect, view: View, parent: RecyclerView, state: RecyclerView.State) {
        with(outRect) {
            right = spaceSize.dpToPx()
        }
    }
}