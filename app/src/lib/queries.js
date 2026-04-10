import { supabase } from './supabase';

/**
 * Fetch all promise statuses from the derived view.
 * This is the ONLY source for progress, status, and checkbox state.
 */
export async function getPromiseStatuses() {
  const { data, error } = await supabase
    .from('promise_status')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch a single promise status by ID.
 */
export async function getPromiseStatus(id) {
  const { data, error } = await supabase
    .from('promise_status')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch milestones for a specific promise.
 */
export async function getMilestones(promiseId) {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('promise_id', promiseId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch constituency details.
 */
export async function getConstituency() {
  const { data, error } = await supabase
    .from('constituencies')
    .select('*')
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch election + candidate info.
 */
export async function getElectionInfo() {
  const { data, error } = await supabase
    .from('elections')
    .select(`
      *,
      constituencies (*),
      election_results (
        *,
        candidates (*)
      )
    `)
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch active feedback types.
 */
export async function getFeedbackTypes() {
  const { data, error } = await supabase
    .from('feedback_types')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data || [];
}

/**
 * Submit anonymous feedback (no user identity stored).
 */
export async function submitFeedback(promiseId, feedbackTypeId) {
  const { data, error } = await supabase
    .from('feedback_cards')
    .insert({
      promise_id: promiseId,
      feedback_type_id: feedbackTypeId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get feedback summary counts for a promise.
 */
export async function getFeedbackSummary(promiseId) {
  const { data, error } = await supabase
    .from('feedback_cards')
    .select('feedback_type_id, verification_status')
    .eq('promise_id', promiseId);

  if (error) throw error;

  // Group by feedback_type_id with counts
  const summary = {};
  (data || []).forEach((card) => {
    if (!summary[card.feedback_type_id]) {
      summary[card.feedback_type_id] = { count: 0, has_multiple_reports: false };
    }
    summary[card.feedback_type_id].count++;
    if (card.verification_status === 'multiple_reports') {
      summary[card.feedback_type_id].has_multiple_reports = true;
    }
  });

  return summary;
}
