package org.mopcon.session.app.ui.common

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.widget.RadioGroup
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.content.ContextCompat
import org.mopcon.session.app.R

class TopRadioGroupBar @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyle: Int = 0
) : ConstraintLayout(context, attrs, defStyle) {

    private val typedArray by lazy {
        context.theme.obtainStyledAttributes(
            attrs,
            R.styleable.CustomRadioGroupBar,
            0,
            0
        )
    }
    private val rg: RadioGroup by lazy { findViewById(R.id.rg) }
    private val tv1: TextView by lazy { findViewById(R.id.tv1) }
    private val tv2: TextView by lazy { findViewById(R.id.tv2) }

    val checkedRadioButtonId: Int
        get() {
            return rg.checkedRadioButtonId
        }

    var onFirstRbChecked: (() -> Unit)? = null
    var onSecondRbChecked: (() -> Unit)? = null

    init {
        val view = LayoutInflater.from(context).inflate(R.layout.item_top_radiogroup_bar, this, false)
        addView(view).apply {
            initView(view)
        }
    }

    private fun initView(view: View) {
        view.apply {
            tv1.text = typedArray.getString(R.styleable.CustomRadioGroupBar_firstRbText)
            tv2.text = typedArray.getString(R.styleable.CustomRadioGroupBar_secondRbText)
            initRg()
        }
    }

    private fun initRg() {
        rg.setOnCheckedChangeListener { _, id ->
            when (id) {
                R.id.rb1 -> {
                    tv1.background = ContextCompat.getDrawable(tv1.context, android.R.color.transparent)
                    tv2.background = ContextCompat.getDrawable(tv2.context, R.drawable.button_capsule_dark_blue)
                    tv1.setTextColor(ContextCompat.getColor(tv1.context, R.color.white))
                    tv2.setTextColor(ContextCompat.getColor(tv1.context, R.color.gray))
                    onFirstRbChecked?.invoke()
//                    agendaAdapter.addFooterAndSubmitList(agendaList.firstOrNull()?.periodData) { rvAgenda.scrollToPosition(0) }
                }
                R.id.rb2 -> {
                    tv1.background = ContextCompat.getDrawable(tv1.context, R.drawable.button_capsule_dark_blue)
                    tv2.background = ContextCompat.getDrawable(tv2.context, android.R.color.transparent)
                    tv1.setTextColor(ContextCompat.getColor(tv1.context, R.color.gray))
                    tv2.setTextColor(ContextCompat.getColor(tv1.context, R.color.white))
                    onSecondRbChecked?.invoke()
//                    agendaAdapter.addFooterAndSubmitList(agendaList.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
                }
            }
        }
    }

}