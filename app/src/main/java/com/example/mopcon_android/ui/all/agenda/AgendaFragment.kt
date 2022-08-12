package com.example.mopcon_android.ui.all.agenda

import android.content.res.Resources
import android.content.res.Resources.getSystem
import android.util.Log
import android.util.TypedValue
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.navigation.Navigation
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentAgendaBinding
import com.example.mopcon_android.ui.base.BaseBindingFragment

class AgendaFragment : BaseBindingFragment<FragmentAgendaBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaBinding
        get() = FragmentAgendaBinding::inflate

    //    private val viewModel: HomeViewModel by viewModel()
    override fun initLayout() {
        initRg()
        initTab()
    }

    private fun initRg() {
        binding.rgDate.setOnCheckedChangeListener { _, id ->
            when (id) {
                R.id.rbDateFirst -> {
                    binding.tvDate1.background = ContextCompat.getDrawable(binding.tvDate1.context, android.R.color.transparent)
                    binding.tvDate2.background = ContextCompat.getDrawable(binding.tvDate2.context, R.drawable.button_capsule_dark_blue)
                    binding.tvDate1.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.white))
                    binding.tvDate2.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.gray))
                }
                R.id.rbDateSecond -> {
                    binding.tvDate1.background = ContextCompat.getDrawable(binding.tvDate1.context, R.drawable.button_capsule_dark_blue)
                    binding.tvDate2.background = ContextCompat.getDrawable(binding.tvDate2.context, android.R.color.transparent)
                    binding.tvDate1.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.gray))
                    binding.tvDate2.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.white))
                }
            }
        }
    }

    private fun initTab() {
        val tabs = binding.tabLayout.getChildAt(0) as ViewGroup

        for (i in 0 until tabs.childCount) {
            val tab = tabs.getChildAt(i)
            val layoutParams = tab.layoutParams as LinearLayout.LayoutParams
            layoutParams.marginEnd = 12.dpToPx()
            layoutParams.marginStart = 12.dpToPx()
            layoutParams.width = 100.dpToPx()
            tab.layoutParams = layoutParams
            binding.tabLayout.requestLayout()
        }
    }

    override fun initAction() {
        binding.tvDummyClick.setOnClickListener {
            Navigation.findNavController(it).navigate(R.id.action_agendaFragment_to_agendaDetailFragment)
        }
    }

    override fun initObserver() {

    }


}
private fun Int.dpToPx(): Int = (this * getSystem().displayMetrics.density).toInt()
//private fun Int.dpToPx(): Dp = (dp * Resources.getSystem().displayMetrics.density)