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
import com.google.android.material.tabs.TabLayout
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

    private fun initTab() {
        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                when (tab?.position) {
                    0 -> viewModel.getAgenda()
                    1 -> viewModel.getExchange()
                    2 -> {}
                }
            }

            override fun onTabUnselected(tab: TabLayout.Tab?) {

            }

            override fun onTabReselected(tab: TabLayout.Tab?) {

            }

        })
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
                    agendaAdapter.addFooterAndSubmitList(agendaList.firstOrNull()?.periodData) {binding.rvAgenda.scrollToPosition(0)}
                }
                R.id.rbDateSecond -> {
                    binding.tvDate1.background = ContextCompat.getDrawable(binding.tvDate1.context, R.drawable.button_capsule_dark_blue)
                    binding.tvDate2.background = ContextCompat.getDrawable(binding.tvDate2.context, android.R.color.transparent)
                    binding.tvDate1.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.gray))
                    binding.tvDate2.setTextColor(ContextCompat.getColor(binding.tvDate1.context, R.color.white))
                    agendaAdapter.addFooterAndSubmitList(agendaList.getOrNull(1)?.periodData){binding.rvAgenda.scrollToPosition(0)}
                }
            }
        }
    }

    override fun initAction() {
        viewModel.getAgenda()
    }

    override fun initObserver() {
        viewModel.agendaList.observe(viewLifecycleOwner) {
            agendaList = it
            if (binding.rgDate.checkedRadioButtonId == R.id.rbDateFirst)
                agendaAdapter.addFooterAndSubmitList(it.firstOrNull()?.periodData){binding.rvAgenda.scrollToPosition(0)}
            else
                agendaAdapter.addFooterAndSubmitList(it.getOrNull(1)?.periodData){binding.rvAgenda.scrollToPosition(0)}
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }


}