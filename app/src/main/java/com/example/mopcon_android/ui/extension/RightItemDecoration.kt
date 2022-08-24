package com.example.mopcon_android.ui.extension

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.mopcon_android.util.dpToPx

class RightItemDecoration(private val spaceSize: Int) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(outRect: Rect, view: View, parent: RecyclerView, state: RecyclerView.State) {
        with(outRect) {
            right = spaceSize.dpToPx()
        }
    }
}