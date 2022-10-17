package org.mopcon.session.app.ui.all.agenda

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.tabs.TabLayout
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentAgendaBinding
import org.mopcon.session.app.ui.all.agenda.detail.AgendaDetailFragment
import org.mopcon.session.app.ui.all.agenda.detail.UnConfDetailFragment
import org.mopcon.session.app.ui.all.home.NoFavClickListener
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.ui.extension.BottomItemDecoration
import org.mopcon.session.app.ui.extension.OnBackPressedListener
import org.mopcon.session.app.util.MD_FORMAT
import org.mopcon.session.app.util.addFragmentToFragment
import org.mopcon.session.app.util.toTimeFormat


class AgendaFragment : BaseBindingFragment<FragmentAgendaBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentAgendaBinding
        get() = FragmentAgendaBinding::inflate

    private val viewModel: AgendaViewModel by viewModel()

    companion object {
        const val FIRST_DATE = "10/15"
        const val SECOND_DATE = "10/16"

        const val PAGE_MAIN = 0
        const val PAGE_UNCONF = 1
        const val PAGE_FAV = 2
    }

    private val agendaAdapter by lazy {
        AgendaAdapter(
            ItemClickListener {
                if (it.speakers.isNullOrEmpty()) Toast.makeText(context, R.string.coming_soon, Toast.LENGTH_SHORT).show()
                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, AgendaDetailFragment.newInstance(it))
//                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, MoreAgendaDetailFragment.newInstance(it.sessionId))
            }, FavClickListener { isChecked, data ->
                if (isChecked) {
                    viewModel.storeAgenda(data)
                } else {
                    viewModel.deleteAgenda(data.sessionId)
                }
            })
    }

    private val unConfAdapter by lazy {
        UnConfAdapter(
            ItemClickListener {
                if (it.speakers.isNullOrEmpty()) Toast.makeText(context, R.string.coming_soon, Toast.LENGTH_SHORT).show()
                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, UnConfDetailFragment.newInstance(it))
//                else parentFragmentManager.addFragmentToFragment(R.id.llAgenda, MoreAgendaDetailFragment.newInstance(it.sessionId))
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

    private val mBackPressedCallback: OnBackPressedCallback by lazy {
        object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                viewModel.updateFavSessionIdList()
                viewModel.updateFavList()
                isEnabled = false
                requireActivity().onBackPressed()
                isEnabled = true
            }
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            viewModel.getAgenda()
            requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner, mBackPressedCallback)
        }
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
                    PAGE_MAIN -> {
                        binding.rvAgenda.adapter = agendaAdapter
                        viewModel.getAgenda()
                    }
                    PAGE_UNCONF -> {
                        binding.rvAgenda.adapter = unConfAdapter
                        viewModel.getExchange()
                    }
                    PAGE_FAV -> {
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
            setHasFixedSize(true)

            /**
             * To avoid ViewHolder's recreating and without disabling smooth animation.
             * @link https://stackoverflow.com/a/60427676/1650674
             */
            val myItemAnimator: DefaultItemAnimator = object : DefaultItemAnimator() {
                override fun canReuseUpdatedViewHolder(viewHolder: RecyclerView.ViewHolder): Boolean {
                    return true
                }
            }
            itemAnimator = myItemAnimator
            /*
            (itemAnimator as SimpleItemAnimator).supportsChangeAnimations = false

            itemAnimator = MyRvAnimator()
            itemAnimator = null
            itemAnimator?.changeDuration = 0
            itemAnimator?.changeDuration = 500
            */
        }
    }

    private fun initDateRg() {
        //filter & refresh list with selected date, scroll to top

        // 10/15 first day
        binding.rgTopBar.onFirstRbChecked = {
            when (binding.tabLayout.selectedTabPosition) {
                PAGE_MAIN -> agendaAdapter.addFooterAndSubmitList(viewModel.agendaList.value?.first?.firstOrNull()?.periodData, viewModel.agendaList.value?.second) {binding.rvAgenda.scrollToPosition(0)}
                PAGE_UNCONF -> unConfAdapter.addFooterAndSubmitList(viewModel.exchangeList.value?.firstOrNull()?.periodData) {binding.rvAgenda.scrollToPosition(0)}
                PAGE_FAV -> agendaFavAdapter.addFooterAndSubmitList(viewModel.favAgendaList.value?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == FIRST_DATE }) {binding.rvAgenda.scrollToPosition(0)}
            }
        }
        // 10/16 second day
        binding.rgTopBar.onSecondRbChecked = {
            when (binding.tabLayout.selectedTabPosition) {
                PAGE_MAIN -> agendaAdapter.addFooterAndSubmitList(viewModel.agendaList.value?.first?.getOrNull(1)?.periodData, viewModel.agendaList.value?.second) {binding.rvAgenda.scrollToPosition(0)}
                PAGE_UNCONF -> unConfAdapter.addFooterAndSubmitList(viewModel.exchangeList.value?.getOrNull(1)?.periodData) {binding.rvAgenda.scrollToPosition(0)}
                PAGE_FAV -> agendaFavAdapter.addFooterAndSubmitList(viewModel.favAgendaList.value?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == SECOND_DATE }) {binding.rvAgenda.scrollToPosition(0)}
            }
        }
    }

    override fun initAction() {
    }

    override fun initObserver() {
        viewModel.agendaList.observe(viewLifecycleOwner) {
            val agendaList = it.first
            val favSessionIdList = it.second

            Log.e(">>>", "favSessionList = $favSessionIdList")

            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                agendaAdapter.addFooterAndSubmitList(agendaList.firstOrNull()?.periodData, favSessionIdList) { binding.rvAgenda.scrollToPosition(0) }
            else
                agendaAdapter.addFooterAndSubmitList(agendaList.getOrNull(1)?.periodData, favSessionIdList) { binding.rvAgenda.scrollToPosition(0) }
        }

        viewModel.exchangeList.observe(viewLifecycleOwner) {
            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1)
                unConfAdapter.addFooterAndSubmitList(it.firstOrNull()?.periodData) { binding.rvAgenda.scrollToPosition(0) }
            else
                unConfAdapter.addFooterAndSubmitList(it.getOrNull(1)?.periodData) { binding.rvAgenda.scrollToPosition(0) }
        }

        viewModel.favAgendaList.observe(viewLifecycleOwner) {
            Log.e(">>>", "123 observe favAgendaList topics = ${it.map { item -> item.topic }}")
            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1) { // day 1
                agendaFavAdapter.addFooterAndSubmitList(it.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == FIRST_DATE }) {}
            } else { // day 2
                agendaFavAdapter.addFooterAndSubmitList(it.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == SECOND_DATE }) {}
            }
        }

        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            Log.e(">>>", "123 favSessionIdList observe = $it")
            if (binding.rgTopBar.checkedRadioButtonId == R.id.rb1) {
                when (binding.tabLayout.selectedTabPosition) {
                    PAGE_MAIN -> agendaAdapter.addFooterAndSubmitList(viewModel.agendaList.value?.first?.firstOrNull()?.periodData, it) {}
                    PAGE_UNCONF -> unConfAdapter.addFooterAndSubmitList(viewModel.exchangeList.value?.firstOrNull()?.periodData, it) {}
                    PAGE_FAV -> agendaFavAdapter.addFooterAndSubmitList(viewModel.favAgendaList.value?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == FIRST_DATE }) {}
                }
            }
            else {
                when (binding.tabLayout.selectedTabPosition) {
                    PAGE_MAIN -> agendaAdapter.addFooterAndSubmitList(viewModel.agendaList.value?.first?.getOrNull(1)?.periodData, it) {}
                    PAGE_UNCONF -> unConfAdapter.addFooterAndSubmitList(viewModel.exchangeList.value?.getOrNull(1)?.periodData, it) {}
                    PAGE_FAV -> agendaFavAdapter.addFooterAndSubmitList(viewModel.favAgendaList.value?.filter { data -> data.startAt.toTimeFormat(MD_FORMAT) == SECOND_DATE }) {}
                }
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

}