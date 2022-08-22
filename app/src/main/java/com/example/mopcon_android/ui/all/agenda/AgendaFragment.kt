package com.example.mopcon_android.ui.all.agenda

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.core.content.ContextCompat
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentAgendaBinding
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.ui.extension.BottomItemDecoration
import com.example.mopcon_android.util.dpToPx
import org.koin.androidx.viewmodel.ext.android.viewModel

class AgendaFragment : BaseBindingFragment<FragmentAgendaBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaBinding
        get() = FragmentAgendaBinding::inflate

    private val viewModel: AgendaViewModel by viewModel()

    private var agendaList = listOf<AgendaData>()

    private val agendaAdapter by lazy {
        AgendaAdapter(
            ItemClickListener {
                val action = AgendaFragmentDirections.actionAgendaFragmentToAgendaDetailFragment(it)
                findNavController().navigate(action)
            })
    }

    override fun initLayout() {
        initRg()
        initTab()
        initRv()
    }

    private fun initRv() {
        binding.rvAgenda.apply {
            adapter = agendaAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            addItemDecoration(BottomItemDecoration(8))
        }
    }

    private fun initRg() {
        binding.rgDate.setOnCheckedChangeListener { _, id ->
            when (id) {
                R.id.rbDateFirst -> {
                    binding.tvDate1.background = ContextCompat.getDrawable(binding.tvDate1.context, android.R.color.transparent)
                    binding.tvDate2.background = ContextCompat.getDrawable(binding.tvDate2.context, R.drawable.button_capsule_dark_blue)
                    binding.tvDate1.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.white))
                    binding.tvDate2.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.gray))
                    agendaAdapter.addFooterAndSubmitList(agendaList.firstOrNull()?.periodData)
                }
                R.id.rbDateSecond -> {
                    binding.tvDate1.background = ContextCompat.getDrawable(binding.tvDate1.context, R.drawable.button_capsule_dark_blue)
                    binding.tvDate2.background = ContextCompat.getDrawable(binding.tvDate2.context, android.R.color.transparent)
                    binding.tvDate1.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.gray))
                    binding.tvDate2.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.white))
                    agendaAdapter.addFooterAndSubmitList(agendaList.getOrNull(1)?.periodData)
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
        Log.e(">>>", "getAgenda")
        viewModel.getAgenda()
    }

    override fun initObserver() {
        viewModel.agendaList.observe(viewLifecycleOwner) {
//            Log.e(">>>", "it = $it")
            agendaList = it
            if (binding.rgDate.checkedRadioButtonId == R.id.rbDateFirst)
                agendaAdapter.addFooterAndSubmitList(it.firstOrNull()?.periodData)
            else
                agendaAdapter.addFooterAndSubmitList(it.getOrNull(1)?.periodData)
        }
    }


}