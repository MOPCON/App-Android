package com.example.mopcon_android.ui.all.more.host_community

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.recyclerview.widget.GridLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentHostCommunityBinding
import com.example.mopcon_android.ui.all.more.host_community.detail.HostCommunityDetailFragment
import com.example.mopcon_android.ui.all.more.host_community.detail.VolunteerDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.ui.extension.BottomItemDecoration
import com.example.mopcon_android.util.addFragmentToFragment
import com.example.mopcon_android.util.openWeb
import org.koin.androidx.viewmodel.ext.android.viewModel

class HostCommunityFragment : BaseBindingFragment<FragmentHostCommunityBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHostCommunityBinding
        get() = FragmentHostCommunityBinding::inflate

    companion object {
        const val VOLUNTEER_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6fHcsyL3Wv649VDA2FnzUn2vO6K6sv1vAe47urvkcf0F_ig/viewform"
        fun newInstance() = HostCommunityFragment().apply {

        }
    }

    private val viewModel: HostCommunityViewModel by viewModel()

    private val communityAdapter by lazy {
        CommunityAdapter(
            CommunityItemClickListener {
                parentFragmentManager.addFragmentToFragment(R.id.llMore, HostCommunityDetailFragment.newInstance(it))
            }
        )
    }

    private val volunteerAdapter by lazy {
        VolunteerAdapter(
            VolunteerItemClickListener {
                parentFragmentManager.addFragmentToFragment(R.id.llMore, VolunteerDetailFragment.newInstance(it))
            },
            FooterClickListener {
                openWeb(context, VOLUNTEER_URL)
            }
        )
    }

    override fun initLayout() {
        binding.titleBar.backPressedListener = { activity?.onBackPressed() }
        initRg()
        initRv()
    }

    override fun initAction() {
        viewModel.getCommunity()
    }

    override fun initObserver() {
        viewModel.community.observe(viewLifecycleOwner) {
            communityAdapter.addFooterAndSubmitList(it.community, it.participant)
        }

        viewModel.volunteer.observe(viewLifecycleOwner) {
            volunteerAdapter.addFooterAndSubmitList(it)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

    private fun initRg() {
        binding.apply {
            rgTopBar.onFirstRbChecked = {
                viewModel.getCommunity()
                titleBar.text = getString(R.string.community)
                rvCommunity.isVisible = true
                rvVolunteer.isVisible = false
            }

            rgTopBar.onSecondRbChecked = {
                viewModel.getVolunteer()
                titleBar.text = getString(R.string.main_organization)
                rvCommunity.isVisible = false
                rvVolunteer.isVisible = true
            }
        }
    }

    private fun initRv() {
        binding.rvCommunity.apply {
            adapter = communityAdapter
            layoutManager = GridLayoutManager(context, 2).apply {
                spanSizeLookup = object : GridLayoutManager.SpanSizeLookup() {
                    override fun getSpanSize(position: Int): Int {
                        return when (communityAdapter.getItemViewType(position)) {
                            CommunityAdapter.ItemType.COMMUNITY_TITLE.ordinal, CommunityAdapter.ItemType.PARTICIPANT_TITLE.ordinal -> 2
                            CommunityAdapter.ItemType.COMMUNITY.ordinal, CommunityAdapter.ItemType.PARTICIPANT.ordinal -> 1
                            else -> 2
                        }
                    }
                }
            }
            addItemDecoration(BottomItemDecoration(20))
        }

        binding.rvVolunteer.apply {
            adapter = volunteerAdapter
            layoutManager = GridLayoutManager(context, 2).apply {
                spanSizeLookup = object : GridLayoutManager.SpanSizeLookup() {
                    override fun getSpanSize(position: Int): Int {
                        return when (volunteerAdapter.getItemViewType(position)) {
                            VolunteerAdapter.ItemType.VOLUNTEER.ordinal -> 1
                            VolunteerAdapter.ItemType.FOOTER.ordinal -> 2
                            else -> 2
                        }
                    }
                }
            }
        }
    }

}