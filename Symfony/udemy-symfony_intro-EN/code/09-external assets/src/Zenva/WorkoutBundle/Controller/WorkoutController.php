<?php

namespace Zenva\WorkoutBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Zenva\WorkoutBundle\Entity\Workout;
use Zenva\WorkoutBundle\Form\WorkoutType;

/**
 * Workout controller.
 *
 * @Route("/workout")
 */
class WorkoutController extends Controller
{

    /**
     * Lists all Workout entities.
     *
     * @Route("/", name="workout")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('ZenvaWorkoutBundle:Workout')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Workout entity.
     *
     * @Route("/", name="workout_create")
     * @Method("POST")
     * @Template("ZenvaWorkoutBundle:Workout:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity  = new Workout();
        $form = $this->createForm(new WorkoutType(), $entity);
        $form->submit($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('workout_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Displays a form to create a new Workout entity.
     *
     * @Route("/new", name="workout_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Workout();
        $form   = $this->createForm(new WorkoutType(), $entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Workout entity.
     *
     * @Route("/{id}", name="workout_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZenvaWorkoutBundle:Workout')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Workout entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Workout entity.
     *
     * @Route("/{id}/edit", name="workout_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZenvaWorkoutBundle:Workout')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Workout entity.');
        }

        $editForm = $this->createForm(new WorkoutType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Edits an existing Workout entity.
     *
     * @Route("/{id}", name="workout_update")
     * @Method("PUT")
     * @Template("ZenvaWorkoutBundle:Workout:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('ZenvaWorkoutBundle:Workout')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Workout entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createForm(new WorkoutType(), $entity);
        $editForm->submit($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('workout_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Workout entity.
     *
     * @Route("/{id}", name="workout_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->submit($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('ZenvaWorkoutBundle:Workout')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Workout entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('workout'));
    }

    /**
     * Creates a form to delete a Workout entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
