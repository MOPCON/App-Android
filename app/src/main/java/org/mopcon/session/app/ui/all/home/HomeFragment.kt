package org.mopcon.session.app.ui.all.home

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.recyclerview.widget.LinearLayoutManager
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentHomeBinding
import org.mopcon.session.app.ui.all.MainActivity
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.ui.extension.OnBackPressedListener
import org.mopcon.session.app.util.addFragmentToFragment
import org.koin.androidx.viewmodel.ext.android.viewModel


class HomeFragment : BaseBindingFragment<FragmentHomeBinding>(), OnBackPressedListener {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHomeBinding = FragmentHomeBinding::inflate

    private val viewModel: HomeViewModel by viewModel()

    private val homeAdapter by lazy {
        HomeAdapter(
            BannerClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, NewsMoreClickListener {
                (activity as MainActivity).setTabToNews()
            }, NewsItemClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, FavItemClickListener {
                if (it.names.isEmpty()) Toast.makeText(context, R.string.coming_soon, Toast.LENGTH_SHORT).show()
                else parentFragmentManager.addFragmentToFragment(R.id.llHome, MoreAgendaDetailFragment.newInstance(it.sessionId))
            }, AddToFavClickListener { isChecked, position, data ->
//                viewModel.deleteAgenda(data.sessionId)
//                viewModel.getStoredAgenda()
            }, NoFavClickListener {
                (activity as MainActivity).setTabToAgenda()
            })
    }

    override fun initLayout() {
        binding.rvHome.apply {
            adapter = homeAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
        }
    }

    override fun initAction() {
    }

    override fun initObserver() {

//        viewModel.bannerAndNews.observe(viewLifecycleOwner) {
//            homeAdapter.addFooterAndSubmitList(it.banner, it.news) { binding.rvHome.scrollToPosition(0) }
//        }

//        viewModel.favAgendaList.observe(viewLifecycleOwner) {
//            Log.e(">>>", "Home favAgendaList = ${it.map { data -> data.sessionId }}")
//            val bannerNewsData = viewModel.bannerAndNews.value
//            homeAdapter.addFooterAndSubmitList(bannerNewsData?.banner, bannerNewsData?.news, it) { binding.rvHome.scrollToPosition(0) }
//        }

        viewModel.combiner.observe(viewLifecycleOwner) {
            val bannerAndNews = it.first
            val favAgendaList = it.second
            homeAdapter.addFooterAndSubmitList(bannerAndNews?.banner, bannerAndNews?.news, favAgendaList) {}
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

    override fun onBackPressed() {
//        viewModel.getStoredAgenda()
    }

    private val mBackPressedCallback: OnBackPressedCallback by lazy {
        object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                viewModel.getStoredAgenda()
                isEnabled = false
                requireActivity().onBackPressed()
                isEnabled = true
            }
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            viewModel.getHomeBannerAndNews()
            viewModel.getStoredAgenda()
            requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner, mBackPressedCallback)
        }
    }

}