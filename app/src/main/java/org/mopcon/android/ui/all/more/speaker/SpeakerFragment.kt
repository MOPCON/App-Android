package org.mopcon.android.ui.all.more.speaker

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import org.mopcon.android.R
import org.mopcon.android.databinding.FragmentSpeakerBinding
import org.mopcon.android.ui.all.more.speaker.detail.SpeakerDetailFragment
import org.mopcon.android.ui.base.BaseBindingFragment
import org.mopcon.android.ui.extension.BottomItemDecoration
import org.mopcon.android.util.addFragmentToFragment
import org.koin.androidx.viewmodel.ext.android.viewModel

class SpeakerFragment : BaseBindingFragment<FragmentSpeakerBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSpeakerBinding = FragmentSpeakerBinding::inflate

    private val viewModel: SpeakerViewModel by viewModel()

    companion object {
        fun newInstance () = SpeakerFragment().apply {

        }
    }

    private val speakersAdapter by lazy {
        SpeakerAdapter(
            SpeakerItemClickListener {
                parentFragmentManager.addFragmentToFragment(R.id.llMore, SpeakerDetailFragment.newInstance(it))
            })
    }

    override fun initLayout() {
        binding.titleBar.backPressedListener = { activity?.onBackPressed() }

        binding.rvSpeaker.apply {
            adapter = speakersAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            addItemDecoration(BottomItemDecoration(20))
        }

    }

    override fun initAction() {
        viewModel.getSpeakers()
    }

    override fun initObserver() {
        viewModel.speakers.observe(viewLifecycleOwner) {
            speakersAdapter.submitList(it)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }


}