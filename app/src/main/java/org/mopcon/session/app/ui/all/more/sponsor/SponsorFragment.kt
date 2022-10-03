package org.mopcon.session.app.ui.all.more.sponsor

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.FragmentSponsorBinding
import org.mopcon.session.app.ui.all.more.sponsor.detail.SponsorDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.ui.extension.BottomItemDecoration
import org.mopcon.session.app.util.addFragmentToFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class SponsorFragment : BaseBindingFragment<FragmentSponsorBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSponsorBinding
        get() = FragmentSponsorBinding::inflate

    private val viewModel: SponsorViewModel by viewModel()

    companion object {
        fun newInstance () = SponsorFragment().apply {

        }
    }

    private val sponsorAdapter by lazy {
        SponsorAdapter(
            SponsorItemClickListener {
                parentFragmentManager.addFragmentToFragment(R.id.llMore, SponsorDetailFragment.newInstance(it))
            }
        )
    }

    override fun initLayout() {
        binding.titleBar.backPressedListener = { activity?.onBackPressed() }

        binding.rvSponsor.apply {
            adapter = sponsorAdapter
            layoutManager = GridLayoutManager(context, 2).apply {
                spanSizeLookup = object : GridLayoutManager.SpanSizeLookup() {
                    override fun getSpanSize(position: Int): Int {
                        return when (sponsorAdapter.getItemViewType(position)) {
                             SponsorAdapter.ItemType.SPONSOR_TITLE.ordinal ->  2
                             SponsorAdapter.ItemType.SPONSOR_CONTENT.ordinal -> 1
                            else -> 2
                        }
                    }
                }
            }
            addItemDecoration(BottomItemDecoration(20))
        }

    }

    override fun initAction() {
        viewModel.getSponsors()
    }

    override fun initObserver() {
        viewModel.sponsors.observe(viewLifecycleOwner) {
            sponsorAdapter.addFooterAndSubmitList(it)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }


}