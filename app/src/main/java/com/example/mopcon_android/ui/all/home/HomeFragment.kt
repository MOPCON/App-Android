package com.example.mopcon_android.ui.all.home

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentHomeBinding
import com.example.mopcon_android.ui.all.MainActivity
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.ui.extension.OnBackPressedListener
import com.example.mopcon_android.util.addFragmentToFragment
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
        viewModel.getHomeBannerAndNews()
        viewModel.getStoredAgenda()
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
            homeAdapter.addFooterAndSubmitList(bannerAndNews?.banner, bannerAndNews?.news, favAgendaList) { binding.rvHome.scrollToPosition(0) }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

    override fun onBackPressed() {
        viewModel.getStoredAgenda()
    }

}