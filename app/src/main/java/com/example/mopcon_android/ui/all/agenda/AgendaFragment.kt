package com.example.mopcon_android.ui.all.agenda

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentAgendaBinding
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.ui.all.agenda.detail.AgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.ui.extension.BottomItemDecoration
import com.example.mopcon_android.util.addFragmentToFragment
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
                parentFragmentManager.addFragmentToFragment(R.id.llAgenda, AgendaDetailFragment.newInstance(it))
            }, FavClickListener { isChecked, data ->
                if (isChecked) {
                    viewModel.storeAgenda(data)
                } else {
                    viewModel.deleteAgenda(data.sessionId)
                }
            })
    }

    override fun initLayout() {
        initDateRg()
        initAgendaTab()
        initRv()
    }

    private fun initAgendaTab() {
        binding.tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                //粉紅色icon：兩天主要議程, 藍色icon：交流場次
                when (tab?.position) {
                    0 -> {
                        viewModel.getAgenda()
                    }
                    1 -> {
                        viewModel.getExchange()
                    }
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

    private fun initDateRg() {
        binding.rgTopBar.onFirstRbChecked = {
            agendaAdapter.addFooterAndSubmitList(agendaList.firstOrNull()?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }

        binding.rgTopBar.onSecondRbChecked = {
            agendaAdapter.addFooterAndSubmitList(agendaList.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }
    }

    override fun initAction() {
        viewModel.getFavSessionIdList()
        viewModel.getAgenda()
    }

    override fun initObserver() {
        viewModel.agendaList.observe(viewLifecycleOwner) {
            agendaList = it

            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                agendaAdapter.addFooterAndSubmitList(it.firstOrNull()?.periodData) { binding.rvAgenda.scrollToPosition(0) }
            else
                agendaAdapter.addFooterAndSubmitList(it.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }

        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            agendaAdapter.favSessionIdList = it
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }


}