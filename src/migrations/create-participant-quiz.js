'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParticipantQuizzes', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      participant_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Participant',
        //   key: 'id'
        // }
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Quiz',
        //   key: 'id'
        // }
      },
      is_finish: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      time_start: {
        defaultValue: null,
        type: Sequelize.DATE
      },
      time_end: {
        defaultValue: null,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParticipantQuizzes');
  }
};