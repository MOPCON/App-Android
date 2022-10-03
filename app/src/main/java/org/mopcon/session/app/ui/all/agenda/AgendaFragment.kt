package org.mopcon.session.app.ui.all.agenda

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentAgendaBinding
import org.mopcon.session.app.ui.all.agenda.detail.AgendaDetailFragment
import org.mopcon.session.app.ui.all.home.NoFavClickListener
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.ui.extension.BottomItemDecoration
import org.mopcon.session.app.ui.extension.OnBackPressedListener
import org.mopcon.session.app.util.MD_FORMAT
import org.mopcon.session.app.util.addFragmentToFragment
import org.mopcon.session.app.util.toTimeFormat
import com.google.android.material.tabs.TabLayout
import org.koin.androidx.viewmodel.ext.android.viewModel

class AgendaFragment : BaseBindingFragment<FragmentAgendaBinding>(), OnBackPressedListener {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaBinding
        get() = FragmentAgendaBinding::inflate

    private val viewModel: AgendaViewModel by viewModel()

    companion object {
        const val FIRST_DATE = "10/15"
        const val SECOND_DATE = "10/16"
    }

    private val agendaAdapter by lazy {
        AgendaAdapter(
            ItemClickListener {
                Log.e(">>>", "sessionId = ${it.sessionId}")
                if (it.speakers.isNullOrEmpty()) Toast.makeText(context, R.string.coming_soon, Toast.LENGTH_SHORT).show()
                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, AgendaDetailFragment.newInstance(it))
            }, FavClickListener { isChecked, data ->
                if (isChecked) {
                    viewModel.storeAgenda(data)
                } else {
                    viewModel.deleteAgenda(data.sessionId)
                }
            })
    }

    private val agendaFavAdapter by lazy {
        AgendaFavAdapter(
            FavItemClickListener {
                if (it.names.isEmpty()) Toast.makeText(context, R.string.coming_soon, Toast.LENGTH_SHORT).show()
                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, MoreAgendaDetailFragment.newInstance(it.sessionId))
            }, AddFavItemClickListener { isChecked, data ->
                if (isChecked) {
                    viewModel.storeAgenda(data)
                } else {
                    viewModel.deleteAgenda(data.sessionId)
                }
            }, NoFavClickListener {
                binding.tabLayout.getTabAt(0)?.select()
            }
        )
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
                        binding.rvAgenda.adapter = agendaAdapter
                        viewModel.getAgenda()
                    }
                    1 -> {
                        binding.rvAgenda.adapter = agendaAdapter
                        viewModel.getExchange()
                    }
                    2 -> {
                        binding.rvAgenda.adapter = agendaFavAdapter
                        viewModel.getStoredAgenda()
                    }
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
            val agendaList = viewModel.agendaList.value
            val isShowStar = binding.tabLayout.selectedTabPosition == 0
            agendaAdapter.addFooterAndSubmitList(isShowStar, agendaList?.firstOrNull()?.periodData/*, viewModel.favIdList*/) { binding.rvAgenda.scrollToPosition(0) }

            val favAgendaList = viewModel.favAgendaList.value
            agendaFavAdapter.addFooterAndSubmitList(favAgendaList?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == FIRST_DATE }) {
                binding.rvAgenda.scrollToPosition(0)
            }
        }

        binding.rgTopBar.onSecondRbChecked = {
            val agendaList = viewModel.agendaList.value
            val isShowStar = binding.tabLayout.selectedTabPosition == 0
            agendaAdapter.addFooterAndSubmitList(isShowStar, agendaList?.getOrNull(1)?.periodData/*, viewModel.favIdList*/) { binding.rvAgenda.scrollToPosition(0) }

            val favAgendaList = viewModel.favAgendaList.value
            agendaFavAdapter.addFooterAndSubmitList(favAgendaList?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == SECOND_DATE }) {
                binding.rvAgenda.scrollToPosition(0)
            }
        }
    }

    override fun initAction() {
        viewModel.getAgenda()
    }

    override fun initObserver() {
        viewModel.agendaList.observe(viewLifecycleOwner) {
            viewModel.getFavSessionIdList()

            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                agendaAdapter.addFooterAndSubmitList(true, it.firstOrNull()?.periodData) { binding.rvAgenda.scrollToPosition(0) }
            else
                agendaAdapter.addFooterAndSubmitList(true, it.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }

        viewModel.exchangeList.observe(viewLifecycleOwner) {
            viewModel.getFavSessionIdList()

            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                agendaAdapter.addFooterAndSubmitList(false, it.firstOrNull()?.periodData) { binding.rvAgenda.scrollToPosition(0) }
            else
                agendaAdapter.addFooterAndSubmitList(false, it.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }

        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            agendaAdapter.favSessionIdList = it
        }

        viewModel.favAgendaList.observe(viewLifecycleOwner) {
            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                agendaFavAdapter.addFooterAndSubmitList(it.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == FIRST_DATE }) {
                    binding.rvAgenda.scrollToPosition(0)
                }
            else
                agendaFavAdapter.addFooterAndSubmitList(it.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == SECOND_DATE }) {
                    binding.rvAgenda.scrollToPosition(0)
                }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

    override fun onBackPressed() {
        viewModel.getFavSessionIdList()
    }


}